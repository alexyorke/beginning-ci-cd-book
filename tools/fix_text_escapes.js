#!/usr/bin/env node
// Remove unnecessary backslash-escapes in normal markdown text (NOT inside fenced code blocks).
// Specifically targets \" and \' which commonly leak from conversions and render poorly in mdBook/GFM.
//
// Usage:
//   node tools/fix_text_escapes.js path/to/file.md [path/to/file2.md ...]
//   node tools/fix_text_escapes.js --dir src
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node tools/fix_text_escapes.js <files...> OR --dir <dir>');
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
if (args[0] === '--dir') {
  const dir = args[1];
  if (!dir) {
    console.error('Missing dir for --dir');
    process.exit(2);
  }
  files = walk(dir);
} else {
  files = args;
}

function fixFile(fp) {
  const original = fs.readFileSync(fp, 'utf8');
  const lines = original.split(/\r?\n/);
  let inFence = false;
  let fence = null;
  let changed = false;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^(```|~~~)/);
    if (m) {
      const marker = m[1];
      if (!inFence) { inFence = true; fence = marker; }
      else if (marker === fence) { inFence = false; fence = null; }
      continue;
    }
    if (inFence) continue;
    const nl = l
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'");
    if (nl !== l) {
      lines[i] = nl;
      changed = true;
    }
  }

  if (!changed) return false;
  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
  return true;
}

let modified = 0;
for (const f of files) {
  try {
    if (fixFile(f)) {
      modified++;
      console.log('M', f);
    }
  } catch (e) {
    console.error('ERR', f, e && e.message ? e.message : e);
  }
}
console.log(`Done. Modified ${modified}/${files.length} files.`);

