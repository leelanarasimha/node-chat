const http = require('node:http');

const server = http.createServer();

server.on('request', (request, response) => {
  //Method, Url, Headers, Body
  console.log('Request Method....', request.method);

  console.log('URL....', request.url);

  console.log('Headers...');
  console.log(request.headers);

  request.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  request.on('end', () => {
    console.log('body completed');
  });
});

server.listen(8050, () => {
  console.log('Server is listening to http://localhost:8050');
});
