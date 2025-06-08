const http = require('node:http');

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent,
  hostname: 'localhost',
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    'content-type': 'application/json'
  }
});

request.write(JSON.stringify({ message: 'Hello there!' }));
request.write(JSON.stringify({ message: 'Hello there!' }));
request.end(JSON.stringify({ message: 'Hello there!' }));
