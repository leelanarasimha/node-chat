const net = require('net');
const fs = require('fs/promises');

(async () => {
  const socket = net.createConnection(
    {
      port: 5050,
      host: '::1'
    },
    async () => {
      console.log('connected to server');
      const fileHandle = await fs.open('test.txt', 'r');
      const fileStream = fileHandle.createReadStream();

      fileStream.on('data', (data) => {
        if (!socket.write(data)) {
          fileStream.pause();
        }
      });

      socket.on('drain', () => {
        fileStream.resume();
      });

      fileStream.on('end', () => {
        console.log('File Sent successfully');
        socket.end();
      });
    }
  );
})();
