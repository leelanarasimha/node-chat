/*
1. Read the file stream src.txt
2. create subprocess using spawn 
3. send the data as stream to the subprocess
*/

const { spawn } = require('node:child_process');
const fs = require('node:fs');
const { stdout } = require('node:process');

const inputFile = fs.createReadStream('src.txt');

const subProcess = spawn('node', ['number_formatter.js', '$', ',']);

inputFile.pipe(subProcess.stdin);

//subProcess.stdout.pipe(stdout);

subProcess.on('exit', () => {
  stdout.write('file processed successfully');
});
