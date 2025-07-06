const net = require('net');
const fs = require('node:fs');

const socketPath = '/tmp/myapp.socket';

if (fs.existsSync(socketPath)) {
  fs.unlinkSync(socketPath);
}

const server = net.createServer();

server.on('connection', (socket) => {
  console.log('client connected');
  socket.write('Hello from server');
  socket.on('data', (data) => {
    console.log(`Received: ${data.toString()}`);
    socket.write(`Echo: ${data}`);
  });

  socket.on('end', () => {
    console.log('client disconnected');
  });
});

server.listen(socketPath, () => {
  console.log(`server is listening on ${socketPath}`);
});
