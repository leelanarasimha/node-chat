const net = require('node:net');
const socketPath = '/tmp/myapp.socket';

const client = net.createConnection(socketPath, () => {
  console.log('connected to server');
  client.write('Hello from client');
});

client.on('data', (data) => {
  console.log(`Received: ${data}`);
});

client.on('end', () => {
  console.log('Disconnected from server');
});
