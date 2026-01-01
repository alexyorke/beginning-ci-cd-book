#!/usr/bin/env node
// Simple static file server for the dist directory.
// Usage: node tools/serve_dist.js dist_dir [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = process.argv[2] || 'dist';
const port = parseInt(process.argv[3] || process.env.PORT || '4000', 10);

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(dir, urlPath === '/' ? '/index.html' : urlPath);
  if (filePath.endsWith('/')) filePath = path.join(filePath, 'index.html');
  fs.stat(filePath, (err, st) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    const stream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', mime(path.extname(filePath)));
    stream.pipe(res);
  });
});

function mime(ext) {
  switch (ext.toLowerCase()) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

server.listen(port, () => {
  console.log(`Serving ${dir} on http://localhost:${port}`);
});

