#!/usr/bin/env node
// Find (and optionally remove) "ChatGPT-y" filler paragraphs that don't contribute to the book.
// This is intentionally conservative:
// - Only considers paragraphs OUTSIDE fenced code blocks
// - Targets short, standalone meta paragraphs (usually 1 sentence)
// - Never touches headings
//
// Usage:
//   node tools/find_chatgpt_filler.js --dir src
//   node tools/find_chatgpt_filler.js --dir src --apply
//
// Output:
//   - Writes agent-tools/chatgpt_filler_report.md
//   - If --apply, rewrites matching files and prints M <file>
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const dirIdx = args.indexOf('--dir');
if (dirIdx === -1 || !args[dirIdx + 1]) {
  console.error('Usage: node tools/find_chatgpt_filler.js --dir <dir> [--apply]');
  process.exit(2);
}
const root = args[dirIdx + 1];
const apply = args.includes('--apply');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

function isFence(line) {
  return /^(```|~~~)/.test(line.trim());
}

function isHeading(line) {
  return /^\s*#{1,6}\s+\S/.test(line);
}

function approxSentenceCount(text) {
  const t = text.replace(/\.\.\./g, '.');
  const m = t.match(/[.!?](\s|$)/g);
  return m ? m.length : 0;
}

function wordCount(text) {
  const m = text.trim().match(/\b[\w'’\-]+\b/g);
  return m ? m.length : 0;
}

// Very conservative "meta/filler" patterns.
// (We avoid removing technical statements like “This ensures X” because those can be valuable.)
const patterns = [
  /\b(let'?s|lets)\s+(break\s+down|take\s+a\s+look|walk\s+through)\b/i,
  /\bhere('?s| is)\s+(a\s+)?(breakdown|summary|snippet|quick\s+overview)\b/i,
  /\b(as\s+you\s+can\s+see)\b/i,
  /\b(hopefully)\b/i,
  /\b(feel\s+free\s+to)\b/i,
  /\b(this\s+level\s+of\s+detail\s+is\s+highly\s+beneficial)\b/i,
  /\b(the\s+workflow\s+you'?ve\s+provided)\b/i,
  /\b(let'?s\s+break\s+down\s+the\s+different\s+parts)\b/i,
  /\bthis\s+helps\s+(maintainers|contributors)\b/i,
  /\bvaluable\s+information\s+to\s+pinpoint\b/i,
  /\b(it'?s\s+important\s+to\s+note)\b/i,
  /^\s*(sure|certainly|of\s+course)\b/i,
];

function isCandidateParagraph(paragraphText) {
  const text = paragraphText.trim();
  if (!text) return false;
  if (text.includes('\n') && text.split('\n').some(isHeading)) return false;
  if (isHeading(text)) return false;

  // Hard cap: avoid huge paragraphs (often long URLs or logs) that can blow up memory/reporting.
  if (text.length > 350) return false;

  // If it’s long, it’s likely content, not filler.
  const wc = wordCount(text);
  if (wc > 45) return false;

  // Prefer single-sentence meta blurbs.
  const sc = approxSentenceCount(text);
  if (sc > 2) return false;

  // Must match one of our meta patterns.
  if (!patterns.some(re => re.test(text))) return false;

  // Avoid removing paragraphs that contain many code-ish tokens; those are usually examples.
  const codeish = /```|::=|<\w+|\/\w+|=\s*\w+|\b(?:yaml|bash|json|docker|kubectl|terraform)\b/i;
  if (codeish.test(text) && wc > 18) return false;

  return true;
}

function processFile(fp) {
  const original = fs.readFileSync(fp, 'utf8');
  const lines = original.split(/\r?\n/);

  let inFence = false;
  let fence = null;

  // Paragraphs: collect spans of non-empty lines outside fences.
  const paragraphs = []; // { startLineIdx, endLineIdxInclusive, text }
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Handle fenced code blocks (allow indentation).
    const fenceMatch = line.trim().match(/^(```|~~~)/);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (!inFence) { inFence = true; fence = marker; }
      else if (marker === fence) { inFence = false; fence = null; }
      i++;
      continue;
    }
    if (inFence) { i++; continue; }

    // skip blank lines
    if (!lines[i].trim()) { i++; continue; }

    const start = i;
    const buf = [];
    while (i < lines.length) {
      const l = lines[i];
      // Stop paragraph on a fence line (including indented fences).
      if (isFence(l)) break;
      if (!l.trim()) break;
      buf.push(l);
      i++;
    }
    // If we immediately hit a fence (buf is empty), avoid infinite loops:
    // let the outer loop handle the fence line next iteration.
    if (buf.length) {
      const end = i - 1;
      const text = buf.join('\n');
      paragraphs.push({ start, end, text });
    } else {
      // Safety: advance at least one line to avoid getting stuck on unexpected input.
      i++;
    }
  }

  const candidates = paragraphs
    .filter(p => isCandidateParagraph(p.text))
    .map(p => ({
      file: fp,
      startLine: p.start + 1,
      endLine: p.end + 1,
      text: p.text.trim(),
    }));

  if (!apply || candidates.length === 0) {
    return { changed: false, candidates };
  }

  // Apply removals by blanking those line ranges (outside fences only).
  const toBlank = new Set();
  for (const c of candidates) {
    for (let li = c.startLine - 1; li <= c.endLine - 1; li++) toBlank.add(li);
  }
  const out = lines.map((l, idx) => (toBlank.has(idx) ? '' : l));
  const normalized = out.join('\n').replace(/\n{4,}/g, '\n\n\n');
  if (normalized !== original) {
    fs.writeFileSync(fp, normalized, 'utf8');
    return { changed: true, candidates };
  }
  return { changed: false, candidates };
}

function trunc(s, max = 500) {
  const t = String(s);
  if (t.length <= max) return t;
  return t.slice(0, max) + ' …(truncated)';
}

const files = walk(root);
let modified = 0;
let candidateCount = 0;
let filesWithCandidates = 0;

const reportPath = path.join('agent-tools', 'chatgpt_filler_report.md');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
const report = fs.createWriteStream(reportPath, { encoding: 'utf8' });
report.write('# ChatGPT filler scan report\n\n');
report.write(`- Root: \`${root}\`\n`);
report.write(`- Mode: ${apply ? 'apply (removed candidates)' : 'scan only'}\n`);
report.write('\n');

for (const f of files) {
  const r = processFile(f);
  if (r.changed) {
    modified++;
    console.log('M', f);
  }
  if (r.candidates.length) {
    filesWithCandidates++;
    candidateCount += r.candidates.length;
    report.write(`## ${f} (${r.candidates.length})\n\n`);
    for (const c of r.candidates.slice(0, 80)) {
      report.write(`- Lines ${c.startLine}-${c.endLine}:\n`);
      report.write('```\n');
      report.write(trunc(c.text) + '\n');
      report.write('```\n\n');
    }
  }
}

report.write(`## Summary\n\n`);
report.write(`- Candidates: ${candidateCount}\n`);
report.write(`- Files with candidates: ${filesWithCandidates}\n`);
report.write(`- Files modified: ${modified}\n`);
report.end();

console.log(`Done. Modified ${modified}/${files.length} files.`);
console.log(`Report: ${reportPath}`);

