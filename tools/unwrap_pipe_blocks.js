#!/usr/bin/env node
// Convert contiguous lines that start with '|' (likely from bad table conversion) into plain markdown.
// - Removes leading '|' and trims whitespace
// - If block looks code-like, wraps in fenced code block (attempt to detect bicep/ts/js)
// Usage: node tools/unwrap_pipe_blocks.js path/to/file.md [--backup]
const fs = require('fs');
const path = require('path');

const fp = process.argv[2];
if (!fp) {
  console.error('Usage: node tools/unwrap_pipe_blocks.js path/to/file.md [--backup]');
  process.exit(2);
}
const doBackup = process.argv.includes('--backup');

const txt = fs.readFileSync(fp, 'utf8');
const lines = txt.split(/\r?\n/);
const out = [];
let i = 0;
let changed = false;

function unwrapBlock(blockLines) {
  // Remove leading '|' and possible surrounding spaces
  const cleaned = blockLines.map(l => l.replace(/^\|\s?/, '').replace(/\s*\|\s*$/, ''));
  // detect code-like
  const codeHints = /(^\s*param\s+)|(^\s*resource\s+)|[\{\}\[\];=]|^\s*const\s+|^\s*function\s+|^\s*import\s+/i;
  const codeLikeCount = cleaned.filter(l => codeHints.test(l)).length;
  const nonEmpty = cleaned.filter(l => l.trim() !== '').length;
  if (nonEmpty > 0 && codeLikeCount >= Math.max(2, Math.floor(nonEmpty / 6))) {
    // try to detect language
    const isBicep = cleaned.some(l => /^\s*param\s+/i.test(l) || /^\s*resource\s+/i.test(l));
    const isTS = cleaned.some(l => /^\s*(const|let|function)\s+/i.test(l));
    const lang = isBicep ? 'bicep' : isTS ? 'ts' : '';
    return ['```' + lang, ...cleaned, '```'];
  }
  // otherwise, return as plain text lines
  return cleaned;
}

while (i < lines.length) {
  if (/^\|/.test(lines[i])) {
    const start = i;
    const block = [];
    while (i < lines.length && /^\|/.test(lines[i])) {
      block.push(lines[i]);
      i++;
    }
    const replaced = unwrapBlock(block);
    if (replaced.join('\n') !== block.join('\n')) changed = true;
    replaced.forEach(l => out.push(l));
  } else {
    out.push(lines[i]);
    i++;
  }
}

if (!changed) {
  console.log('No pipe-blocks found to unwrap.');
  process.exit(0);
}

if (doBackup) fs.writeFileSync(fp + '.bak-pipefix', txt, 'utf8');
fs.writeFileSync(fp, out.join('\n'), 'utf8');
console.log(`Unwrapped pipe-blocks in ${fp}${doBackup ? ` (backup at ${fp}.bak-pipefix)` : ''}`);
process.exit(0);

