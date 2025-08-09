const zlib = require('node:zlib');
const fs = require('node:fs');

const source = fs.createReadStream('hugeFile.txt.gz');
const destination = fs.createWriteStream('uncompressed.txt');

const zip = zlib.createGunzip();

source.pipe(zip).pipe(destination);
