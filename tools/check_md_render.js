#!/usr/bin/env node
// Simple checker: finds backslash-escapes inside fenced code blocks that commonly shouldn't be escaped.
// Usage: node tools/check_md_render.js path/to/file.md
const fs = require('fs');
const path = require('path');

const fp = process.argv[2];
if (!fp) {
  console.error('Usage: node tools/check_md_render.js path/to/file.md');
  process.exit(2);
}

const text = fs.readFileSync(fp, 'utf8');
const lines = text.split(/\r?\n/);

let inFence = false;
let fenceMarker = null;
const problemRe = /\\(?=[<>\[\]'"${}\-\\/])/; // backslash before chars we care about
const problems = [];

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
  if (inFence && problemRe.test(line)) {
    problems.push({ line: i + 1, content: line.trim() });
  }
}

if (problems.length === 0) {
  console.log(`OK — no problematic backslash-escapes found in code blocks for ${path.basename(fp)}`);
  process.exit(0);
} else {
  console.error(`Found ${problems.length} problematic lines in code blocks for ${path.basename(fp)}:`);
  problems.slice(0, 200).forEach(p => {
    console.error(`  line ${p.line}: ${p.content}`);
  });
  process.exit(1);
}

