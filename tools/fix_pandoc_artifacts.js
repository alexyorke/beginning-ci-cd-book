#!/usr/bin/env node
// Remove common Pandoc-style artifacts that render as literal junk in mdBook/GFM:
// - Heading attribute blocks: "### Title {#id .unnumbered}" -> "### Title"
// - Inline attribute blocks: "{.underline}", "{.mark}"
// - Link label wrappers: "[[Label]{.underline}](url)" -> "[Label](url)"
// - Selection markers: "/// Start of Selection", "// End of Selection", etc.
// - ASCII table border lines like "+-----+-----+"
//
// IMPORTANT: This intentionally avoids touching content inside fenced code blocks.
//
// Usage:
//   node tools/fix_pandoc_artifacts.js --dir src
//   node tools/fix_pandoc_artifacts.js path/to/file.md [path/to/file2.md ...]
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node tools/fix_pandoc_artifacts.js <files...> OR --dir <dir>');
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

function fixOutsideFenceLine(line) {
  let l = line;

  // Normalize optional UTF-8 BOM that can break beginning-of-line matches.
  const hasBom = l.charCodeAt(0) === 0xfeff;
  const bom = hasBom ? '\ufeff' : '';
  if (hasBom) l = l.slice(1);

  // Drop "Start/End of Selection" markers (various prefixes).
  if (/^\s*(?:\/\/\/|\/\/)\s*(?:Start|End)\s+of\s+Selection\s*$/i.test(l)) return '';

  // Drop ASCII table border lines like "+----+----+" (often from copy/paste).
  if (/^\s*\+[-+]{5,}\+\s*$/.test(l)) return '';

  // Drop headings that are *only* an attribute block (common Pandoc artifact):
  //   "## {#section-13 .unnumbered}"
  if (/^#{1,6}\s+\{[^}]*\}\s*$/.test(l)) return '';

  // Remove heading attribute blocks: "## Title {#id .unnumbered}" -> "## Title"
  // (This catches any "{#...}" / "{.class}" blob at end of heading line.)
  l = l.replace(/^(#{1,6}\s+.*?)(\s+\{[^}]*\})\s*$/, '$1');
  // If the heading had no text (e.g. "### {#id .unnumbered}"), drop it entirely.
  if (/^#{1,6}\s*$/.test(l)) return '';

  // Remove common inline attribute tokens.
  l = l.replace(/\{\.underline\}/g, '');
  l = l.replace(/\{\.mark\}/g, '');

  // Convert Pandoc-ish double-bracket link labels to normal markdown:
  //   [[Label]](url) -> [Label](url)
  //   [[Label]] -> [Label] (rare, but harmless)
  l = l.replace(/\[\[/g, '[').replace(/\]\]/g, ']');

  // Collapse any accidental empty link text "[](...)" created by replacements.
  l = l.replace(/\[\s*\]\(([^)]+)\)/g, '<$1>');

  // Normalize spacing left behind by deletions.
  l = l.replace(/\s{2,}/g, ' ');
  return bom + l;
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

    const nl = fixOutsideFenceLine(l);
    if (nl !== l) {
      lines[i] = nl;
      changed = true;
    }
  }

  // Remove empty lines that are *only* created by our deletions (do not aggressively reflow).
  // (We keep empty lines; this just prevents CRLF artifacts like "\n\n\n\n" from ballooning.)
  const normalized = lines.join('\n').replace(/\n{4,}/g, '\n\n\n');
  if (normalized !== original) changed = true;

  if (!changed) return false;
  fs.writeFileSync(fp, normalized, 'utf8');
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

