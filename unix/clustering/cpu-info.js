const os = require('node:os');

const cpus = os.cpus();

console.log(`Total CPU cores: ${cpus.length}`);
console.log('CPU Info:', cpus);
