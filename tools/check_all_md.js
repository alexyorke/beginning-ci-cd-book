#!/usr/bin/env node
// Scan a directory for .md files and check for backslash-escapes inside fenced code blocks.
// Usage: node tools/check_all_md.js path/to/dir
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('Usage: node tools/check_all_md.js path/to/dir');
  process.exit(2);
}

const root = process.argv[2];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

function checkFile(fp) {
  const txt = fs.readFileSync(fp, 'utf8');
  const lines = txt.split(/\r?\n/);
  let inFence = false;
  let fence = null;
  const badLines = [];
  const re = /\\(?=[<>\[\]'"${}\-\\/])/;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const m = l.match(/^(```|~~~)/);
    if (m) {
      const marker = m[1];
      if (!inFence) {
        inFence = true;
        fence = marker;
        continue;
      } else if (marker === fence) {
        inFence = false;
        fence = null;
        continue;
      }
    }
    if (inFence && re.test(l)) badLines.push(i + 1);
  }
  return badLines;
}

const files = walk(root);
const results = [];
for (const f of files) {
  const bad = checkFile(f);
  if (bad.length) results.push({ file: f, lines: bad });
}

if (results.length === 0) {
  console.log('OK — no problematic backslash-escapes found across', files.length, 'files');
  process.exit(0);
} else {
  console.error('Found files with problematic backslash-escapes:');
  results.forEach(r => {
    console.error(`- ${r.file}: lines ${r.lines.slice(0, 10).join(', ')}${r.lines.length > 10 ? '...' : ''}`);
  });
  process.exit(1);
}

