const { Worker } = require('node:worker_threads');

const obj = { name: 'john' };

const worker = new Worker('./calc.js', { workerData: obj });

console.log('main thread: ', obj.name);
