const http = require('http');

const server = http.createServer();

const mainServers = [
  { host: 'localhost', port: 9001 },
  { host: 'localhost', port: 9002 }
];

const PORT = 9000;

server.on('request', (clientRequest, proxyResponse) => {
  const mainServer = mainServers.shift();
  mainServers.push(mainServer);

  const proxyRequest = http.request({
    host: mainServer.host,
    port: mainServer.port,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: clientRequest.headers
  });

  proxyRequest.on('response', (mainServerResponse) => {
    proxyResponse.writeHead(mainServerResponse.statusCode, mainServerResponse.headers);
    mainServerResponse.pipe(proxyResponse);
  });

  proxyRequest.on('error', (e) => {
    console.log(e);
  });
  clientRequest.pipe(proxyRequest);
});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
