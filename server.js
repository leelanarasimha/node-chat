const net = require('net');
const server = net.createServer((socket) => {});

let clients = [];

server.on('connection', (socket) => {
  console.log('New client connected');
  const clientId = clients.length + 1;
  //Broadcast the message when the new user joins
  clients.forEach((client) => {
    client.socket.write(`User ${clientId} Joined`);
  });

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

  socket.on('end', () => {
    //Broadcast the message when the user left the chat
    clients.forEach((client) => {
      client.socket.write(`User ${clientId} left`);
    });
  });
});

server.listen(3008, () => {
  console.log('server listening on port 3008');
});
