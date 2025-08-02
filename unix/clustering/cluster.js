const cluster = require('node:cluster');
const os = require('node:os');

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`✅ Worker ${worker.process.pid} is online`);
  });

  cluster.on('listening', (worker, address) => {
    console.log(`📡 Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`);
  });

  cluster.on('disconnect', (worker) => {
    console.log(`⚠️ Worker ${worker.process.pid} disconnected`);
  });

  cluster.on('fork', (worker) => {
    console.log(`🔧 Forked worker ${worker.process.pid}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  require('./server');
}
