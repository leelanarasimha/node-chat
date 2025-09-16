const { workerData } = require('node:worker_threads');

const port = workerData.port;

port.on('message', (msg) => {
  console.log('message received', msg);
});

port.postMessage('sending text');
