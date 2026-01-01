#!/usr/bin/env node
// Naive markdown -> HTML compiler for verification (supports headings, paragraphs, fenced code, images, links, lists)
// Usage: node tools/compile_md_to_html.js src_dir dest_dir
const fs = require('fs');
const path = require('path');

if (process.argv.length < 4) {
  console.error('Usage: node tools/compile_md_to_html.js src_dir dest_dir');
  process.exit(2);
}

const src = process.argv[2];
const dest = process.argv[3];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(ent => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && /\.md$/i.test(ent.name)) return [full];
    return [];
  });
}

function mdToHtml(md) {
  const lines = md.split(/\r?\n/);
  let i = 0;
  let out = [];
  while (i < lines.length) {
    const l = lines[i];
    // fenced code
    const fm = l.match(/^```(.*)$/);
    if (fm) {
      const lang = fm[1] || '';
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      out.push(`<pre><code${lang?` class="language-${lang}"`:''}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      i++; continue;
    }
    // heading
    const hm = l.match(/^(#{1,6})\s*(.*)$/);
    if (hm) {
      const level = hm[1].length;
      out.push(`<h${level}>${mdInline(hm[2])}</h${level}>`);
      i++; continue;
    }
    // image
    const imgm = l.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (imgm) {
      out.push(`<img alt="${escapeHtml(imgm[1])}" src="${escapeHtml(imgm[2])}" />`);
      i++; continue;
    }
    // list
    if (/^\s*[-*]\s+/.test(l)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      out.push('<ul>');
      items.forEach(it => out.push(`<li>${mdInline(it)}</li>`));
      out.push('</ul>');
      continue;
    }
    if (l.trim() === '') { out.push(''); i++; continue; }
    // paragraph (collect contiguous lines)
    const para = [];
    while (i < lines.length && lines[i].trim() !== '') {
      para.push(lines[i]);
      i++;
    }
    out.push(`<p>${mdInline(para.join(' '))}</p>`);
  }
  return out.join('\n');
}

function mdInline(s) {
  // Escape text first, then add inline tags.
  // Important: do NOT escape again at the call site, or links will render as literal HTML.
  let x = escapeHtml(String(s));
  // `code`
  x = x.replace(/`([^`]+)`/g, (m, p) => `<code>${escapeHtml(p)}</code>`);
  // [text](url) with .md -> .html rewrite for local browsing
  x = x.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, t, u) => {
    const href = String(u).replace(/\.md(\)|$)/i, '.html$1').replace(/\.md$/i, '.html');
    return `<a href="${escapeHtml(href)}">${escapeHtml(t)}</a>`;
  });
  return x;
}

function inline(s){ return s; }

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const files = walk(src);
// Best-effort: copy images so relative image links work in the browser.
// Many pages reference ./images/*.png
try {
  const chaptersImages = path.join(src, 'chapters', 'images');
  if (fs.existsSync(chaptersImages)) {
    fs.mkdirSync(path.join(dest, 'chapters', 'images'), { recursive: true });
    fs.cpSync(chaptersImages, path.join(dest, 'chapters', 'images'), { recursive: true });
    fs.mkdirSync(path.join(dest, 'aside', 'images'), { recursive: true });
    fs.cpSync(chaptersImages, path.join(dest, 'aside', 'images'), { recursive: true });
  }
} catch (e) {
  console.error('Warning: failed to copy images:', e && e.message ? e.message : e);
}

files.forEach(f => {
  const rel = path.relative(src, f);
  const outPath = path.join(dest, rel.replace(/\.md$/i, '.html'));
  const dir = path.dirname(outPath);
  fs.mkdirSync(dir, { recursive: true });
  const md = fs.readFileSync(f, 'utf8');
  const body = mdToHtml(md);
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(rel)}</title><style>body{font-family:Inter,system-ui,Arial;margin:32px}pre{background:#f6f8fa;padding:12px;border-radius:6px;overflow:auto}code{font-family:monospace;background:#f0f0f0;padding:2px 4px;border-radius:4px}</style></head><body>${body}</body></html>`;
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('W', outPath);
});
console.log('Compiled', files.length, 'files to', dest);
process.exit(0);

