const net = require('net');
const fs = require('fs/promises');
const path = require('path');

(async () => {
  const socket = net.createConnection(
    {
      port: 5050,
      host: '::1'
    },
    async () => {
      console.log('connected to server');
      const filePath = process.argv[2];
      const fileName = path.basename(filePath);

      socket.write(`fileName: ${fileName}---`);

      const fileHandle = await fs.open(filePath, 'r');
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
