const { Worker } = require('node:worker_threads');

// Example1: Sending Data with WorkerData
// const obj = { name: 'john' };

// const worker = new Worker('./calc.js', { workerData: obj });

// console.log('main thread: ', obj.name);

//Example2: Sending data using MessageChannel
// const messageChannel = new MessageChannel();

// const port1 = messageChannel.port1;
// const port2 = messageChannel.port2;

// port1.postMessage('Port2 John');
// port2.postMessage('port1 joe');

// port2.on('message', (msg) => {
//   console.log('port2 received the message', msg);
// });

// port1.on('message', (msg) => {
//   console.log('port1 received the message', msg);
// });

//Example3: Communication between two worker threads
const { port1, port2 } = new MessageChannel();

const thread1 = new Worker('./calc.js', { workerData: { port: port1 }, transferList: [port1] });
const thread2 = new Worker('./calc.js', { workerData: { port: port2 }, transferList: [port2] });
