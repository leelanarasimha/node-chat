const cluster = require('node:cluster');
const os = require('node:os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  require('./server');
}
