const { spawn, exec } = require('child_process');

console.log(process.argv);

const subprocess = spawn('ls -l');

// subprocess.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// exec("echo 'Running the exec script'", (err, stdout, stderr) => {
//   console.log(stdout.toString());
// });
