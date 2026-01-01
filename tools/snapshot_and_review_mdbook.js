#!/usr/bin/env node
// Snapshot all rendered HTML pages from a locally served mdBook site (default: http://127.0.0.1:4000),
// then run heuristic checks to flag pages likely rendering incorrectly.
//
// Usage:
//   node tools/snapshot_and_review_mdbook.js
//   node tools/snapshot_and_review_mdbook.js http://127.0.0.1:4000
//
// Output:
//   - Writes HTML snapshot files under agent-tools/snapshots/<timestamp>/
//   - Writes a report JSON + Markdown summary in the same folder
const fs = require('fs');
const path = require('path');

const baseUrl = (process.argv[2] || 'http://127.0.0.1:4000').replace(/\/+$/, '');

function nowStamp() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeFileNameFromUrl(url) {
  const u = new URL(url);
  let p = u.pathname;
  if (p.endsWith('/')) p += 'index.html';
  if (p === '/') p = '/index.html';
  // Drop leading slash
  p = p.replace(/^\//, '');
  // Avoid Windows-invalid characters
  p = p.replace(/[<>:"|?*]/g, '_');
  return p;
}

function stripPre(html) {
  return html.replace(/<pre[\s\S]*?<\/pre>/gi, '');
}

function extractAround(hay, idx, radius = 140) {
  const start = Math.max(0, idx - radius);
  const end = Math.min(hay.length, idx + radius);
  return hay.slice(start, end).replace(/\s+/g, ' ').trim();
}

function findRegexSnippets(hay, re, limit = 3) {
  const out = [];
  let m;
  let i = 0;
  const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  while ((m = r.exec(hay)) && i < limit) {
    out.push({ match: m[0], context: extractAround(hay, m.index) });
    i++;
  }
  return out;
}

function extractHrefs(html) {
  return [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
}

function extractSrcs(html) {
  return [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
}

function normalizeInternal(url, currentUrl) {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:') || url.startsWith('javascript:')) return null;
  if (url.startsWith('#')) return null;
  try {
    return new URL(url, currentUrl).toString();
  } catch {
    return null;
  }
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' });
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  const text = await res.text();
  return { ok: res.ok, status: res.status, contentType: ct, text };
}

async function headOrGetOk(url) {
  // Some local servers don't implement HEAD well; just GET and ignore body size.
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, status: String(e) };
  }
}

async function crawlAllPages() {
  const start = baseUrl + '/';
  const visited = new Set();
  const queue = [start];
  const pages = [];

  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    let res;
    try {
      res = await fetch(url, { redirect: 'follow' });
    } catch (e) {
      pages.push({ url, ok: false, status: String(e), contentType: '', html: '' });
      continue;
    }
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!res.ok) {
      pages.push({ url, ok: false, status: res.status, contentType: ct, html: '' });
      continue;
    }
    if (!ct.includes('text/html')) continue;
    const html = await res.text();
    pages.push({ url, ok: true, status: res.status, contentType: ct, html });

    for (const href of extractHrefs(html)) {
      const next = normalizeInternal(href, url);
      if (!next) continue;
      if (!next.startsWith(baseUrl + '/')) continue;
      // Skip static assets
      if (next.includes('/fonts/') || next.includes('/highlight') || next.endsWith('.css') || next.endsWith('.js')) continue;
      queue.push(next);
    }
  }

  return pages;
}

function analyzePage(page) {
  const html = page.html || '';
  const htmlNoPre = stripPre(html);
  const issues = [];

  const checks = [
    { kind: 'escaped_anchor', re: /&lt;a href=/i, against: 'noPre' },
    { kind: 'raw_code_fence', re: /```/, against: 'noPre' },
    { kind: 'raw_md_table', re: /(^|[^a-z])\|\s*---\s*\|/i, against: 'noPre' },
    { kind: 'pandoc_attrs', re: /\{#.*?\}|\{\.underline\}|\{\.mark\}/i, against: 'noPre' },
    { kind: 'double_bracket_links', re: /\[\[[^\]]+\]\]/, against: 'noPre' },
    { kind: 'broken_angle_img_syntax', re: /!<\s*\.?\/images\/[^>]+>/i, against: 'noPre' },
    { kind: 'selection_markers', re: /(Start|End)\s+of\s+Selection/i, against: 'noPre' },
  ];

  for (const c of checks) {
    const hay = c.against === 'noPre' ? htmlNoPre : html;
    if (c.re.test(hay)) {
      issues.push({
        kind: c.kind,
        snippets: findRegexSnippets(hay, c.re, 3),
      });
    }
  }

  // Bare command paragraphs heuristic (same spirit as crawl_mdbook.js).
  const bareCmdRe = /<p>\s*(find|tar|zip|unzip|grep|sed|awk|cp|mv|rm|mkdir|touch|chmod|chown|ln|pwd|ls|du|df|curl|wget|git|npm|npx|docker|kubectl|az|aws|gcloud)\b[^<]*\s+-[^<]*<\/p>/gi;
  if (bareCmdRe.test(html)) {
    issues.push({ kind: 'bare_command_paragraph', snippets: findRegexSnippets(html, bareCmdRe, 5) });
  }

  return issues;
}

async function main() {
  const stamp = nowStamp();
  const outDir = path.join('agent-tools', 'snapshots', stamp);
  ensureDir(outDir);

  console.log(`Crawling ${baseUrl} ...`);
  const pages = await crawlAllPages();
  const okPages = pages.filter(p => p.ok);
  console.log(`Found ${okPages.length} HTML pages.`);

  // Snapshot
  for (const p of okPages) {
    const rel = safeFileNameFromUrl(p.url);
    const fp = path.join(outDir, rel);
    ensureDir(path.dirname(fp));
    fs.writeFileSync(fp, p.html, 'utf8');
  }

  // Analyze
  const report = {
    baseUrl,
    timestamp: new Date().toISOString(),
    pages: [],
  };

  // Collect internal link + image checks on a best-effort basis.
  const knownUrls = new Set(okPages.map(p => p.url));

  for (const p of okPages) {
    const issues = analyzePage(p);

    // Broken internal href targets (only for same-site html targets).
    const badLinks = [];
    for (const href of extractHrefs(p.html)) {
      const next = normalizeInternal(href, p.url);
      if (!next) continue;
      if (!next.startsWith(baseUrl + '/')) continue;
      // Ignore anchors
      const noHash = next.split('#')[0];
      // Ignore assets
      if (noHash.endsWith('.css') || noHash.endsWith('.js')) continue;
      // If it looks like an html page but wasn't discovered, flag it.
      if (noHash.endsWith('.html') || noHash.endsWith('/')) {
        if (!knownUrls.has(noHash) && !knownUrls.has(noHash + '/') && !knownUrls.has(noHash.replace(/\/$/, ''))) {
          badLinks.push({ href, resolved: noHash });
        }
      }
    }
    if (badLinks.length) issues.push({ kind: 'broken_internal_link_target', detail: badLinks.slice(0, 50) });

    // Broken images (same-site only)
    const imgSrcs = extractSrcs(p.html).filter(s => s && !s.startsWith('data:'));
    const imgChecks = [];
    for (const src of imgSrcs) {
      const u = normalizeInternal(src, p.url);
      if (!u) continue;
      if (!u.startsWith(baseUrl + '/')) continue;
      // only check images
      if (!/\.(png|jpg|jpeg|gif|webp|svg)(\?|#|$)/i.test(u)) continue;
      imgChecks.push(u);
    }
    const brokenImgs = [];
    for (const u of [...new Set(imgChecks)].slice(0, 80)) {
      const r = await headOrGetOk(u);
      if (!r.ok) brokenImgs.push({ url: u, status: r.status });
    }
    if (brokenImgs.length) issues.push({ kind: 'broken_images', detail: brokenImgs });

    report.pages.push({
      url: p.url,
      snapshotFile: safeFileNameFromUrl(p.url),
      issueCount: issues.length,
      issues,
    });
  }

  report.pages.sort((a, b) => b.issueCount - a.issueCount);

  const jsonPath = path.join(outDir, 'render-review.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf8');

  const mdLines = [];
  mdLines.push(`# Render review`);
  mdLines.push('');
  mdLines.push(`- Base URL: ${baseUrl}`);
  mdLines.push(`- Snapshot: ${stamp}`);
  mdLines.push(`- Pages: ${report.pages.length}`);
  mdLines.push('');

  const flagged = report.pages.filter(p => p.issueCount > 0);
  mdLines.push(`## Flagged pages (${flagged.length})`);
  mdLines.push('');
  for (const p of flagged) {
    mdLines.push(`- ${p.issueCount} issue(s): ${p.url} (snapshot: \`${p.snapshotFile}\`)`);
    for (const iss of p.issues.slice(0, 6)) {
      mdLines.push(`  - ${iss.kind}`);
      if (iss.snippets && iss.snippets.length) {
        mdLines.push(`    - example: ${iss.snippets[0].context}`);
      }
    }
  }
  mdLines.push('');
  mdLines.push(`## Clean pages (${report.pages.length - flagged.length})`);
  mdLines.push('');
  mdLines.push(`(Not listed; see JSON for full detail.)`);

  const mdPath = path.join(outDir, 'render-review.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'), 'utf8');

  console.log(`Wrote snapshot+report to ${outDir}`);
  if (flagged.length) {
    console.error(`FLAGGED ${flagged.length} pages. See ${mdPath} and ${jsonPath}.`);
    process.exit(1);
  } else {
    console.log(`OK — no issues flagged by heuristics. See ${mdPath} and ${jsonPath}.`);
    process.exit(0);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(2);
});

