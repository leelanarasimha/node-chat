const LeelaJS = require('../leelaJs');

const leelaJs = new LeelaJS();

leelaJs.server.on('request', (req, res) => {
  console.log(`Server 1 is running ${req.url}`);
});

leelaJs.route('get', '/', (req, res) => {
  res.sendFile('./public/index.html', 'text/html');
});

leelaJs.route('get', '/styles.css', (req, res) => {
  res.sendFile('./public/styles.css', 'text/css');
});

leelaJs.route('get', '/main.js', (req, res) => {
  res.sendFile('./public/main.js', 'text/javascript');
});
leelaJs.route('POST', '/login', (req, res) => {
  res.status(400).json({ message: 'Bad login info' });
});

const PORT = 9001;

leelaJs.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
