const net = require('net');
const fs = require('fs/promises');

const server = net.createServer();

server.on('connection', async (socket) => {
  console.log('Client connected');
  const fileHandle = await fs.open('storage/test.txt', 'w');
  const fileStream = fileHandle.createWriteStream();

  socket.on('data', async (data) => {
    fileStream.write(data);
  });

  socket.on('end', async () => {
    console.log('Client disconnected');
    fileStream.end();
    await fileHandle.close();
  });
});

server.listen(5050, '::1', () => {
  console.log('Server is listening on port 5050', server.address());
});
