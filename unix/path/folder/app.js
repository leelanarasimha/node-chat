const fs = require('fs');
const path = require('node:path');
require('./file.js');

const content = fs.readFileSync(path.join(__dirname, 'text.txt'), 'utf8');
console.log(content.toString());
