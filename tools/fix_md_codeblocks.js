#!/usr/bin/env node
// Safe fixer: unescapes backslashes inside fenced code blocks for characters that shouldn't be escaped.
// Usage: node tools/fix_md_codeblocks.js path/to/file.md [--backup]
const fs = require('fs');
const path = require('path');

const fp = process.argv[2];
if (!fp) {
  console.error('Usage: node tools/fix_md_codeblocks.js path/to/file.md [--backup]');
  process.exit(2);
}
const doBackup = process.argv.includes('--backup');

const original = fs.readFileSync(fp, 'utf8');
const lines = original.split(/\r?\n/);

let inFence = false;
let fenceMarker = null;
let modified = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const fm = line.match(/^(```|~~~)/);
  if (fm) {
    const marker = fm[1];
    if (!inFence) {
      inFence = true;
      fenceMarker = marker;
      continue;
    } else if (marker === fenceMarker) {
      inFence = false;
      fenceMarker = null;
      continue;
    }
  }
  if (inFence) {
    // remove backslashes that directly precede characters that should not be escaped in code blocks
    const newLine = line.replace(/\\(?=[<>\[\]'"${}\-\\/])/g, '').replace(/\\\\(["'])/g, '$1');
    if (newLine !== line) {
      lines[i] = newLine;
      modified = true;
    }
  }
}

if (!modified) {
  console.log('No changes needed.');
  process.exit(0);
}

if (doBackup) {
  fs.writeFileSync(fp + '.bak', original, 'utf8');
}
fs.writeFileSync(fp, lines.join('\n'), 'utf8');
console.log(`Fixed file written to ${fp}${doBackup ? ` (backup at ${fp}.bak)` : ''}`);
process.exit(0);

