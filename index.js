const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 5500;
const PUBLIC_DIR = path.join(__dirname);

http
  .createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.includes('.') ? req.url : req.url + '.html');
    const ext = path.extname(filePath);

    const mimeTypes = {
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.html': 'text/html',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.ico': 'image/vnd.microsoft.icon',
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.exists(filePath, exists => {
      if (!exists) {
        res.writeHead(404);
        res.end(path.join(PUBLIC_DIR, "404.html"));
        return;
      }

      const acceptEncoding = req.headers['accept-encoding'] || '';
      const raw = fs.createReadStream(filePath);

      res.setHeader('Content-Type', contentType);

      if (acceptEncoding.includes('gzip')) {
        res.writeHead(200, {
          'Content-Encoding': 'gzip',
          'Cache-Control': 'public, max-age=31536000, immutable'
        });
        raw.pipe(zlib.createGzip()).pipe(res);
      } else {
        res.writeHead(200);
        raw.pipe(res);
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
