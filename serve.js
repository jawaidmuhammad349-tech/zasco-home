// Local preview server: node serve.js, then open http://localhost:8080
const http = require('http');
const fs = require('fs');
const path = require('path');

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.json': 'application/json',
};

http.createServer((req, res) => {
  const name = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'zasco-homepage.html';
  const file = path.resolve(__dirname, name);
  if (!file.startsWith(__dirname + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); return res.end('Not found');
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(process.env.PORT || 8080, () => console.log('http://localhost:' + (process.env.PORT || 8080)));
