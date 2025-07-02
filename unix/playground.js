const { spawn, exec } = require('child_process');
const { stdin, stdout, stderr } = require('node:process');

// stdin.on('data', (chunk) => {
//   // console.log('got the data from the input terminal', chunk.toString('utf-8'));
//   stdout.write(`got the data from the input terminal', ${chunk.toString('utf-8')}`);
// });

stdout.write('Sending data to the terminal or stdout');
stderr.write('Sending the stderr data');

// console.log(process.env.MODE);

// const subprocess = spawn('./playground', ['adasdas', 'adsada']);

// subprocess.stdout.on('data', (data) => {
//   console.log(data.toString());
// });
// subprocess.stderr.on('data', (data) => {
//   console.log('standard error from c', data.toString());
// });

// subprocess.stdin.write('Sending data from the Node');
// subprocess.stdin.end();

// exec("echo 'Running the exec script'", (err, stdout, stderr) => {
//   console.log(stdout.toString());
// });
