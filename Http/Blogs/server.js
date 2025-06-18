const LeelaJS = require('../leelaJs');

const leelaJs = new LeelaJS();

const POSTS = [
  {
    id: 1,
    title: 'This is the dummy title post',
    description: 'This is teh description',
    userId: 1
  }
];

const USERS = [{ id: 1, name: 'leela', username: 'leela', password: 'leela' }];

leelaJs.route('get', '/api/posts', (req, res) => {
  const postsData = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    return {
      ...post,
      author: user.name
    };
  });
  res.json(postsData);
});

leelaJs.route('post', '/api/login', (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString('utf8');
  });
  req.on('end', () => {
    const reqBody = JSON.parse(body);
    const username = reqBody.username;
    const password = reqBody.password;

    const userDetails = USERS.find((user) => user.username === username);

    if (userDetails && userDetails.password === password) {
      res.json({ message: 'Successfully Logged in' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

leelaJs.route('get', '/api/user', (req, res) => {
  //send the current logged in user details
});

leelaJs.listen(8000, () => {
  console.log(`Server is listening at port 8000`);
});
