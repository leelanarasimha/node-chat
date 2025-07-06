/**
 * read the data that came as input
 */

const { stdin } = require('process');
const fs = require('node:fs');
const { exit, argv } = require('node:process');
const { Transform } = require('node:stream');

const outputFile = fs.createWriteStream('dest.txt');

class NumberFormatter extends Transform {
  constructor(options = {}) {
    super(options);
    this.buffer = ''; //handle the partial data
  }

  _transform(chunk, encoding, callback) {
    this.buffer += chunk.toString();
    const numbers = this.buffer.split(' ');
    this.buffer = numbers.pop();

    for (let number of numbers) {
      if (number.trim()) {
        const formattedNumber = formatNumber(number, argv[2], argv[3]);
        this.push(formattedNumber + ' ');
      }
    }
    callback();
  }

  _flush(callback) {
    if (this.buffer.trim()) {
      this.push(formatNumber(this.buffer.trim(), argv[2], argv[3]));
    }
    callback();
  }
}

function formatNumber(number, begin, divider) {
  let formattedNumber = '';
  for (let i = number.length; i > 0; i--) {
    const positionFromRight = number.length - i;
    if (positionFromRight > 0 && positionFromRight % 3 === 0) {
      formattedNumber = divider + formattedNumber;
    }
    formattedNumber = number[i - 1] + formattedNumber;
  }
  return begin + formattedNumber;
}

const numberFormatter = new NumberFormatter();
stdin
  .pipe(numberFormatter)
  .pipe(outputFile)
  .on('finish', () => {
    exit(0);
  });
