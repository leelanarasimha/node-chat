const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.bind(5050, '127.0.0.1', () => {
  console.log('successfully connected');
  console.log(server.address());
});

server.on('message', (msg, rinfo) => {
  console.log('message received');
  console.log(msg.toString());
  console.log(rinfo);
});
