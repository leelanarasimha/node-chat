const { stdin, stdout, stderr } = require('process');
const fs = require('node:fs');

const filePath = process.argv[2];
if (filePath) {
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(stdout);
  fileStream.on('end', () => {
    stdout.write('\n');
    process.exit(0);
  });
}

stdin.pipe(stdout);
