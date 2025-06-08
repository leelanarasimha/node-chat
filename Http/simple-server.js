const http = require('node:http');

const server = http.createServer();

server.on('request', (request, response) => {
  //Method, Url, Headers, Body
  console.log('Request Method....', request.method);

  console.log('URL....', request.url);

  console.log('Headers...');
  console.log(request.headers);
  let data = '';
  let name = request.headers.name;

  request.on('data', (chunk) => {
    data += chunk.toString();
  });

  request.on('end', () => {
    data = JSON.parse(data);
    response.writeHead(200, { 'content-type': 'application/json' });
    response.write(JSON.stringify({ message: `Post with title ${data.title} was created by ${name}` }));
    response.end();
  });
});

server.listen(8050, () => {
  console.log('Server is listening to http://localhost:8050');
});
