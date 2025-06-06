const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hi there');
});

server.listen(80, '::1', (socket) => {
  console.log(server.address());
  console.log('Server running on http://127.0.0.1:80');
});
