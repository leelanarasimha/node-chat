const http = require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer();

server.on('request', async (request, response) => {
  console.log(request.url);
  console.log(request.method);

  if (request.url === '/' && request.method === 'GET') {
    response.setHeader('content-type', 'text/html');
    const fileHandle = await fs.open('./public/index.html', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }

  if (request.url === '/styles.css' && request.method === 'GET') {
    response.setHeader('content-type', 'text/css');
    const fileHandle = await fs.open('./public/styles.css', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }

  if (request.url === '/main.js' && request.method === 'GET') {
    response.setHeader('content-type', 'text/javascript');
    const fileHandle = await fs.open('./public/main.js', 'r');
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);
  }
  if (request.url === '/login' && request.method === 'POST') {
    response.setHeader('content-type', 'application/json');
    response.statusCode = 200;

    const body = {
      message: 'Logging in...'
    };

    response.end(JSON.stringify(body));
  }

  if (request.url === '/user' && request.method === 'PUT') {
    response.setHeader('content-type', 'application/json');
    response.statusCode = 401;

    const body = {
      message: 'you first have to log in'
    };

    response.end(JSON.stringify(body));
  }
  if (request.url === '/uploads' && request.method === 'PUT') {
    const fileHandle = await fs.open('./storage/image.jpeg', 'w');
    const fileStream = fileHandle.createWriteStream();

    request.pipe(fileStream);

    request.on('end', () => {
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify({ message: 'File Uploaded Successfully' }));
    });
  }
});

server.listen(9000, () => {
  console.log('Server is listening at http://localhost:9000');
});
