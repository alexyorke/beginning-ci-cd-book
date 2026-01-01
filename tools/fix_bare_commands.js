#!/usr/bin/env node
// Wrap "bare" shell command lines in markdown into fenced ```bash blocks.
// Intended for the command-example chapters where commands were written as plain paragraphs.
//
// Heuristic:
// - If a non-empty line looks like a shell command (starts with common command word, contains spaces/flags/etc)
// - And we are NOT inside an existing fenced code block
// - Then we wrap consecutive command-looking lines into a ```bash block.
//
// Usage:
//   node tools/fix_bare_commands.js path/to/file.md [path/to/file2.md ...]
//   node tools/fix_bare_commands.js --glob "src/chapters/*Command_Examples*.md"
//
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node tools/fix_bare_commands.js <files...> OR --glob <simplePrefixDir>');
  process.exit(2);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

let files = [];
if (args[0] === '--glob') {
  // very small "glob": treat provided value as a directory prefix, include all .md under it
  const dir = args[1];
  if (!dir) {
    console.error('Missing value for --glob');
    process.exit(2);
  }
  files = walk(dir);
} else {
  files = args;
}

const commandStarters = new Set([
  'find','tar','zip','unzip','grep','rg','sed','awk','cat','less','more','head','tail','sort','uniq',
  'cp','mv','rm','mkdir','rmdir','touch','chmod','chown','ln','pwd','ls','du','df','free','ps','top','kill',
  'curl','wget','ssh','scp','rsync','git','npm','npx','node','python','pip','pip3','docker','kubectl','helm',
  'az','aws','gcloud','terraform','make','bash','sh','pwsh','powershell','echo','printf'
]);

function isFence(line) {
  return /^(```|~~~)/.test(line.trim());
}

function looksLikeCommand(line) {
  const s = line.trim();
  if (!s) return false;
  if (s.startsWith('#') || s.startsWith('- ') || s.startsWith('* ') || /^\d+\.\s+/.test(s)) return false;
  if (s.startsWith('```') || s.startsWith('~~~')) return false;
  // already inline code
  if (s.startsWith('`') && s.endsWith('`')) return false;
  // Avoid wrapping pure sentences
  if (/[.!?]$/.test(s)) return false;
  // Must start with a known command word
  const first = s.split(/\s+/)[0];
  if (!commandStarters.has(first)) return false;
  // Require at least one "command-like" trait
  if (/\s+-/.test(s) || /\s+--/.test(s) || /\s+\|/.test(s) || /\s+>/.test(s) || /\s+\*/.test(s) || s.includes('/') || s.includes('\\') || s.includes('$')) {
    return true;
  }
  // or just "cmd arg"
  return s.split(/\s+/).length >= 2;
}

function fixFile(fp) {
  const original = fs.readFileSync(fp, 'utf8');
  const lines = original.split(/\r?\n/);
  const out = [];
  let inFence = false;
  let fenceMarker = null;
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const m = line.match(/^(```|~~~)/);
    if (m) {
      const marker = m[1];
      if (!inFence) { inFence = true; fenceMarker = marker; }
      else if (marker === fenceMarker) { inFence = false; fenceMarker = null; }
      out.push(line);
      continue;
    }
    if (!inFence && looksLikeCommand(line)) {
      // gather consecutive command-ish lines (allow blank lines between? no)
      const block = [];
      let j = i;
      while (j < lines.length && looksLikeCommand(lines[j])) {
        block.push(lines[j].trimEnd());
        j++;
      }
      out.push('```bash');
      block.forEach(b => out.push(b));
      out.push('```');
      changed = true;
      i = j - 1;
      continue;
    }
    out.push(line);
  }

  if (!changed) return false;
  fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return true;
}

let modified = 0;
files.forEach(f => {
  try {
    if (fixFile(f)) {
      modified++;
      console.log('M', f);
    }
  } catch (e) {
    console.error('ERR', f, e && e.message ? e.message : e);
  }
});
console.log(`Done. Modified ${modified}/${files.length} files.`);

