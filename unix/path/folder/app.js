const fs = require('fs');
const { Z_PARTIAL_FLUSH } = require('zlib');
require('./file.js');

const content = fs.readFileSync('./text.txt', 'utf8');
console.log(content.toString());
