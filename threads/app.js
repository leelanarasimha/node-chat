const { Worker } = require('node:worker_threads');

const a = 400;
console.log(a);

for (let i = 0; i < 10; i++) {
  new Worker('./calc.js');
}
