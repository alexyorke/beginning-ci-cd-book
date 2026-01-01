#!/usr/bin/env node
// Remove empty list items and obvious noise lines from markdown.
// - Deletes lines that are only "-" / "*" / "+", optionally with whitespace
// - Deletes lines that are only ordered-list marker like "1." with no content
// - Deletes lines that are only repeated spaces after "-   "
//
// Usage: node tools/cleanup_empty_list_items.js --dir src
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args[0] !== '--dir' || !args[1]) {
  console.error('Usage: node tools/cleanup_empty_list_items.js --dir <dir>');
  process.exit(2);
}
const root = args[1];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

function cleanup(fp) {
  const original = fs.readFileSync(fp, 'utf8');
  const lines = original.split(/\r?\n/);
  const out = [];
  let changed = false;
  let inFence = false;
  let fence = null;

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const fm = l.match(/^(```|~~~)/);
    if (fm) {
      const marker = fm[1];
      if (!inFence) { inFence = true; fence = marker; }
      else if (marker === fence) { inFence = false; fence = null; }
      out.push(l);
      continue;
    }
    if (!inFence) {
      if (/^\s*[-*+]\s*$/.test(l)) { changed = true; continue; }
      if (/^\s*\d+\.\s*$/.test(l)) { changed = true; continue; }
      if (/^\s*-\s{2,}$/.test(l)) { changed = true; continue; }
    }
    out.push(l);
  }

  if (!changed) return false;
  fs.writeFileSync(fp, out.join('\n'), 'utf8');
  return true;
}

const files = walk(root);
let modified = 0;
for (const f of files) {
  if (cleanup(f)) {
    modified++;
    console.log('M', f);
  }
}
console.log(`Done. Modified ${modified}/${files.length} files.`);

