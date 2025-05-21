const net = require('net');
const server = net.createServer((socket) => {});

let clients = [];

server.on('connection', (socket) => {
  console.log('New client connected');
  const clientId = clients.length + 1;
  clients.push({ id: clientId.toString(), socket });

  socket.write(`ID-${clientId}`);

  socket.on('data', (data) => {
    const dataStr = data.toString();
    const id = dataStr.substring(0, dataStr.indexOf('-'));
    const message = dataStr.substring(dataStr.indexOf('-message-') + 9);
    const formattedMessage = `User ${id}: ${message}`;
    clients.forEach((client) => {
      client.socket.write(formattedMessage);
    });
  });
});

server.listen(3008, () => {
  console.log('server listening on port 3008');
});
