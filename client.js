const net = require('net');
const readlinePromises = require('readline/promises');

const rl = readlinePromises.createInterface({
  input: process.stdin,
  output: process.stdout
});
let clientId;

const socket = net.createConnection(
  {
    port: 3008
  },
  async () => {
    console.log('connected to server!');
  }
);

socket.on('data', async (data) => {
  const dataStr = data.toString();
  const isClientId = dataStr.indexOf('ID-') === 0;
  console.log();
  moveCursorUp(0, -1);
  clearLine();
  if (isClientId) {
    clientId = dataStr.substring(3);
    console.log(`Your Id is ${clientId}`);
  } else {
    console.log(dataStr);
  }
  await ask();
});

const ask = async () => {
  const message = await rl.question('Enter a message: ');
  socket.write(`${clientId}-message-${message}`);
  moveCursorUp(0, -1);
  clearLine(0);
};

const moveCursorUp = (x, y) => {
  process.stdout.moveCursor(x, y);
};

const clearLine = (dir) => {
  process.stdout.clearLine(dir);
};

socket.on('end', () => {
  console.log('connection ended');
  rl.close();
});
