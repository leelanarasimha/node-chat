const dgram = require('dgram');

const client = dgram.createSocket('udp4');

client.send('Hi leela', 5050, '127.0.0.1', () => {
  console.log('message sent');
  client.close();
});
