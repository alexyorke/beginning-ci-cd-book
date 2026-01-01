#!/usr/bin/env node
// Convert broken image syntax produced by some conversions:
//   !<./images/foo.png>  -> ![](./images/foo.png)
// Also handles quoted/space paths inside the <>.
//
// Does NOT touch fenced code blocks.
//
// Usage:
//   node tools/fix_angle_bracket_images.js --dir src
//   node tools/fix_angle_bracket_images.js path/to/file.md [path/to/file2.md ...]
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node tools/fix_angle_bracket_images.js <files...> OR --dir <dir>');
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

    const nl = l.replace(/!\s*<\s*([^>]+?)\s*>/g, (_all, inner) => {
      const url = String(inner).trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
      return `![](${url})`;
    });
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

