const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let name = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'zasco-homepage.html';
  const file = path.join(__dirname, path.basename(name));
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end('Not found'); }
  const body = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' +
    fs.readFileSync(file, 'utf8') + '</body></html>';
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(body);
}).listen(8080, () => console.log('http://localhost:8080'));
