#!/usr/bin/env node
// Detect fenced code blocks that actually contain prose (not code) and unwrap them.
// Also unescape common backslash-escapes in prose blocks (e.g., \" -> ", \' -> ')
// Usage:
//   node tools/fix_miswrapped_codeblocks.js path/to/file.md [--backup]
//   node tools/fix_miswrapped_codeblocks.js --dir src
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node tools/fix_miswrapped_codeblocks.js path/to/file.md [--backup] OR --dir <dir>');
  process.exit(2);
}
const doBackup = args.includes('--backup');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

function fixFile(fp) {
  const txt = fs.readFileSync(fp, 'utf8');
  const lines = txt.split(/\r?\n/);
  const out = [];
  let i = 0;
  let changed = false;

  while (i < lines.length) {
    const line = lines[i];
    const fm = line.match(/^```(.*)$/);
    if (fm) {
      const fenceLang = fm[1] || '';
      const block = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].startsWith('```')) {
        block.push(lines[j]);
        j++;
      }
      if (j >= lines.length) {
        // unterminated fence, just push and break
        out.push(line);
        i++;
        continue;
      }
      // analyze block: count code-like lines vs prose-like lines
      const codeHint = /(^\s*param\s+)|(^\s*resource\s+)|[\{\}\[\];=<>]|^\s*const\s+|^\s*function\s+|^\s*import\s+/i;
      let codeLike = 0;
      let proseLike = 0;
      for (const l of block) {
        if (codeHint.test(l)) codeLike++;
        // prose heuristic: contains multiple words and punctuation
        if (/[\w].*[\.\,\;].*/.test(l) || /\w{20,}/.test(l)) proseLike++;
      }
      // if block is mostly prose (proseLike > codeLike), unwrap it
      if (proseLike > codeLike) {
        // unescape common backslash sequences in prose
        const cleaned = block.map(l => l.replace(/\\(["'])/g, '$1').replace(/\\\./g, '.'));
        cleaned.forEach(l => out.push(l));
        changed = true;
      } else {
        // keep as-is
        out.push(line);
        block.forEach(l => out.push(l));
        out.push(lines[j]); // closing fence
      }
      i = j + 1;
    } else {
      out.push(line);
      i++;
    }
  }

  if (!changed) return false;
  if (doBackup) fs.writeFileSync(fp + '.bak-unwrapcode', txt, 'utf8');
  fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return true;
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
  files = [args[0]];
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
process.exit(0);

