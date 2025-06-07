const net = require('net');
const fs = require('fs/promises');

const server = net.createServer();

let fileStream;
let fileHandle;

server.on('connection', async (socket) => {
  console.log('Client connected');

  socket.on('data', async (data) => {
    if (!fileHandle) {
      socket.pause();
      const indexOfDivider = data.indexOf('---');
      const fileName = data.subarray(10, indexOfDivider).toString('utf8');
      fileHandle = await fs.open(`storage/${fileName}`, 'w');
      fileStream = fileHandle.createWriteStream();
      fileStream.write(data.subarray(indexOfDivider + 3));
      socket.resume();
      fileStream.on('drain', () => {
        socket.resume();
      });
    } else {
      if (!fileStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on('end', async () => {
    console.log('Client disconnected');
    fileStream.end();
    await fileHandle.close();
    fileHandle = undefined;
    fileStream = undefined;
  });
});

server.listen(5050, '::1', () => {
  console.log('Server is listening on port 5050', server.address());
});
