const fs = require('fs/promises');

(async () => {
  const fileHandle = await fs.open('hugeFile.txt', 'w');
  const fileStream = fileHandle.createWriteStream();

  const numberOfWrites = 600000000;
  let i = 0;
  console.log('writing data to file');
  async function pushToFile() {
    while (i < numberOfWrites) {
      if (!fileStream.write(i.toString())) {
        break;
      }

      if (i === numberOfWrites - 1) {
        console.log('closing the file Stream');
        fileStream.close();
      }
      i++;
    }
  }

  fileStream.on('finish', async () => {
    console.log('finished successfully writing closing file Handle');
    await fileHandle.close();
  });

  fileStream.on('drain', () => {
    pushToFile();
  });

  pushToFile();
})();
