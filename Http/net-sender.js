const net = require('net');

const socket = net.createConnection(
  {
    port: 8050,
    host: 'localhost'
  },
  () => {
    const head = Buffer.from(
      '504f5354202f6372656174652d706f737420485454502f312e310d0a636f6e74656e742d747970653a206170706c69636174696f6e2f6a736f6e0d0a6e616d653a206a6f650d0a486f73743a206c6f63616c686f73743a383035300d0a436f6e6e656374696f6e3a206b6565702d616c6976650d0a436f6e74656e742d4c656e6774683a2035370d0a0d0a',
      'hex'
    );

    const body = Buffer.from(
      '7b227469746c65223a2273616d706c6520706f73742068656164696e67222c22626f6479223a2273616d706c6520706f737420626f6479227d',
      'hex'
    );
    socket.write(Buffer.concat([head, body]));
  }
);

socket.on('data', (chunk) => {
  console.log(chunk.toString());
});

socket.on('end', () => {
  console.log('finished response');
  socket.end();
});
