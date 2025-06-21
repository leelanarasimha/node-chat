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

const SESSIONS = [];

const USERS = [{ id: 1, name: 'leela', username: 'leela', password: 'leela' }];

leelaJs.beforeEach((req, res, next) => {
  console.log('first middleware called');
  next();
});
leelaJs.beforeEach((req, res, next) => {
  console.log('second middleware called');
  setTimeout(() => {
    next();
  }, 2000);
});
leelaJs.beforeEach((req, res, next) => {
  console.log('third middleware called');
  setTimeout(() => {
    next();
  }, 2000);
});

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
      const token = Math.floor(Math.random() * 10000000000).toString();

      SESSIONS.push({
        userId: userDetails.id,
        token
      });
      res.setHeader('Set-Cookie', [`token=${token}; Path=/`, `user=Leelawebdev; Path=/`]);
      //res.setHeader('Set-Cookie', `user=Leelawebdev; Path=/`);
      res.json({ message: 'Successfully Logged in' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

leelaJs.route('get', '/api/user', (req, res) => {
  const cookies = req.headers.cookie;
  const cookieArray = cookies.split(';');
  let cookieData = {};
  for (let cookie of cookieArray) {
    const singleCookie = cookie.split('=');
    cookieData[singleCookie[0].trim()] = singleCookie[1].trim();
  }

  const token = cookieData['token'];

  const session = SESSIONS.find((sess) => sess.token === token);
  console.log(session);
  console.log(SESSIONS);
  if (session) {
    const user = USERS.find((singleUser) => singleUser.id === session.userId);
    res.json(user);
  } else {
    res.status(401).json({ error: 'Invalid user data' });
  }
  //send the current logged in user details
});

leelaJs.listen(8000, () => {
  console.log(`Server is listening at port 8000`);
});
