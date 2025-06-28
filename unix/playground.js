const { spawn, exec } = require('child_process');

console.log(process.env.PATH);

const subprocess = spawn('echo', ['hello']);

subprocess.stdout.on('data', (data) => {
  console.log(data.toString());
});

exec("echo 'Running the exec script'", (err, stdout, stderr) => {
  console.log(stdout.toString());
});
