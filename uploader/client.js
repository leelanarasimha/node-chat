const net = require('net');
const fs = require('fs/promises');
const path = require('path');
const readline = require('readline');

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

      const fileSize = (await fileHandle.stat()).size;
      let bytesUploaded = 0;
      let uploadedPercentage = 0;

      fileStream.on('data', (data) => {
        bytesUploaded += data.length;
        const newPercentage = Math.floor((bytesUploaded / fileSize) * 100);
        if (newPercentage !== uploadedPercentage) {
          uploadedPercentage = newPercentage;
          readline.moveCursor(process.stdout, 0, -1);
          readline.clearLine(process.stdout, 0);
          console.log(`uploading: ${uploadedPercentage}%`);
        }
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
