const leelaJs = require('leelajs');

const LeelaJS = new leelaJs();

const PORT = 3000;

LeelaJS.route('get', '/', (req, res) => {
  res.json({ message: 'Hello from server' });
});

LeelaJS.route('get', '/heavy', (req, res) => {
  for (let i = 0; i < 10000000000; i++);
  res.json({ message: 'Done' });
});

LeelaJS.listen(PORT, () => {
  console.log(process.pid);
  console.log(`Server is listening at port ${PORT}`);
});
