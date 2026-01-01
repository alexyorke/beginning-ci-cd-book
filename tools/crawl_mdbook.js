#!/usr/bin/env node
// Crawl a mdBook site and flag likely formatting issues.
// Usage: node tools/crawl_mdbook.js [baseUrl]
// Example: node tools/crawl_mdbook.js http://127.0.0.1:4000
const baseUrl = (process.argv[2] || 'http://127.0.0.1:4000').replace(/\/+$/, '');

async function main() {
  const start = baseUrl + '/';
  const visited = new Set();
  const queue = [start];
  const problems = [];

  while (queue.length) {
    const url = queue.shift();
    if (visited.has(url)) continue;
    visited.add(url);

    let res;
    try {
      res = await fetch(url, { redirect: 'follow' });
    } catch (e) {
      problems.push({ url, kind: 'fetch_error', detail: String(e) });
      continue;
    }

    if (!res.ok) {
      problems.push({ url, kind: 'http_status', detail: String(res.status) });
      continue;
    }

    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (!ct.includes('text/html')) continue;

    const html = await res.text();
    const htmlWithoutPre = html.replace(/<pre[\s\S]*?<\/pre>/gi, '');

    // Heuristics for "formatting is broken"
    const checks = [
      { re: /&lt;a href=/i, kind: 'escaped_anchor' },
      // Only flag these if they appear outside rendered code blocks
      { re: /```/, kind: 'raw_code_fence', against: 'noPre' },
      { re: /(^|[^a-z])\|\s*---\s*\|/i, kind: 'raw_md_table', against: 'noPre' },
      { re: /\\&quot;|\\'/, kind: 'suspicious_backslash_escape', against: 'noPre' },
    ];
    for (const c of checks) {
      const hay = c.against === 'noPre' ? htmlWithoutPre : html;
      if (c.re.test(hay)) problems.push({ url, kind: c.kind });
    }

    // Detect "bare commands" that likely should be code blocks.
    // mdBook renders true code blocks as <pre><code>. This flags command-looking paragraphs.
    const bareCmdRe = /<p>\s*(find|tar|zip|unzip|grep|sed|awk|cp|mv|rm|mkdir|touch|chmod|chown|ln|pwd|ls|du|df|curl|wget|git|npm|npx|docker|kubectl|az|aws|gcloud)\b[^<]*\s+-[^<]*<\/p>/gi;
    if (bareCmdRe.test(html)) {
      problems.push({ url, kind: 'bare_command_paragraph' });
    }

    // Extract links to other pages under baseUrl
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
    for (const href of hrefs) {
      if (!href) continue;
      if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('#')) continue;
      const next = new URL(href, url).toString();
      if (!next.startsWith(baseUrl + '/')) continue;
      // Skip known non-content
      if (next.includes('/fonts/') || next.includes('/highlight') || next.endsWith('.css') || next.endsWith('.js')) continue;
      queue.push(next);
    }
  }

  if (problems.length) {
    console.error(`Found ${problems.length} potential issues across ${visited.size} pages:`);
    for (const p of problems.slice(0, 200)) console.error('-', p.kind, p.url, p.detail || '');
    process.exit(1);
  } else {
    console.log(`OK — crawled ${visited.size} pages with no obvious formatting red flags.`);
    process.exit(0);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(2);
});

