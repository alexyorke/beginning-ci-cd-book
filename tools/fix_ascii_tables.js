#!/usr/bin/env node
// Convert large ASCII-art table blocks (lines starting with '+' and '|' borders) into plain markdown.
// - Removes top/bottom border lines
// - Removes leading/trailing '|' from each inner line
// - If the inner content looks like code (multiple lines with code characters), wraps in fenced code block.
// Usage: node tools/fix_ascii_tables.js path/to/file.md [--backup]
const fs = require('fs');
const path = require('path');

const fp = process.argv[2];
if (!fp) {
  console.error('Usage: node tools/fix_ascii_tables.js path/to/file.md [--backup]');
  process.exit(2);
}
const doBackup = process.argv.includes('--backup');

const txt = fs.readFileSync(fp, 'utf8');
const lines = txt.split(/\r?\n/);

const out = [];
let i = 0;
let changed = false;

function isTableBorder(line) {
  // border like +-----+ or +=====+ (long)
  return /^\+[=-]{3,}\+/.test(line);
}

while (i < lines.length) {
  const line = lines[i];
  if (isTableBorder(line)) {
    // collect until matching closing border
    let j = i + 1;
    const block = [];
    while (j < lines.length && !isTableBorder(lines[j])) {
      block.push(lines[j]);
      j++;
    }
    // skip the closing border if present
    if (j < lines.length && isTableBorder(lines[j])) {
      // process block: remove leading/trailing '|' and optionally wrap code fence
      const cleaned = block.map(l => {
        let s = l;
        // remove leading '|' and optional trailing '|'
        if (/^\|/.test(s)) {
          s = s.replace(/^\|\s?/, '');
        }
        if (/\|\s*$/.test(s)) {
          s = s.replace(/\s*\|\s*$/, '');
        }
        return s;
      });

      // detect if content looks like code: many lines contain '{' or ':' or '=' or keywords like 'param' or 'resource'
      const codeHints = /[\{\}:=]|^\s*param\s+|^\s*resource\s+/i;
      const codeLikeCount = cleaned.filter(l => codeHints.test(l)).length;
      const nonEmptyCount = cleaned.filter(l => l.trim() !== '').length;

      if (nonEmptyCount > 0 && codeLikeCount >= Math.max(2, Math.floor(nonEmptyCount / 6))) {
        // wrap in fenced code block (try to detect bicep if 'param' or 'resource' present)
        const isBicep = cleaned.some(l => /^\s*param\s+/i.test(l) || /^\s*resource\s+/i.test(l));
        out.push('```' + (isBicep ? 'bicep' : ''));
        cleaned.forEach(l => out.push(l));
        out.push('```');
      } else {
        // otherwise, push as normal paragraphs, preserving blank lines
        cleaned.forEach(l => out.push(l));
      }
      changed = true;
      i = j + 1;
      continue;
    } else {
      // not a closed table, just push line and advance
      out.push(line);
      i++;
      continue;
    }
  } else {
    out.push(line);
    i++;
  }
}

if (!changed) {
  console.log('No ASCII table blocks found to convert.');
  process.exit(0);
}

if (doBackup) fs.writeFileSync(fp + '.bak-tablefix', txt, 'utf8');
fs.writeFileSync(fp, out.join('\n'), 'utf8');
console.log(`Converted ASCII-table blocks in ${fp}${doBackup ? ` (backup at ${fp}.bak-tablefix)` : ''}`);
process.exit(0);

