const { workerData } = require('node:worker_threads');
console.log('This is the worker thread');
workerData.name = 'Leela';

console.log('WOrker Data: ', workerData.name);
