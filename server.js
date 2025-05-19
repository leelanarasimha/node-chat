const net = require('net');
const server = net.createServer((socket) => {});

let clients = [];

server.on('connection', (socket) => {
  console.log('New client connected');
  const clientId = clients.length + 1;
  clients.push({ id: clientId.toString(), socket });

  socket.write(`ID-${clientId}`);

  socket.on('data', (message) => {
    console.log(message.toString());
  });
});

server.listen(3008, () => {
  console.log('server listening on port 3008');
});
