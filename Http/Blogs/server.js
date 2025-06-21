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

//Token authentication middleware
leelaJs.beforeEach((req, res, next) => {
  const routesToAuthenticate = ['GET /api/user', 'PUT /api/user', 'POST /api/posts', 'DELETE /api/logout'];
  if (routesToAuthenticate.indexOf(`${req.method} ${req.url}`) !== -1) {
    if (req.headers.cookie) {
      const cookies = req.headers.cookie;
      const cookieArray = cookies.split(';');
      let cookieData = {};
      for (let cookie of cookieArray) {
        const singleCookie = cookie.split('=');
        cookieData[singleCookie[0].trim()] = singleCookie[1].trim();
      }

      const token = cookieData['token'];
      const session = SESSIONS.find((sess) => sess.token === token);
      if (session) {
        req.userId = session.userId;
        return next();
      }
    }
    return res.status(401).json({ error: 'Unauthorized' });
  } else {
    next();
  }
});

//Parse json body
leelaJs.beforeEach((req, res, next) => {
  const contentType = req.headers['Content-Type'];
  if (contentType === 'application/json') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString('utf8');
    });
    req.on('end', () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
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
  const username = req.body.username;
  const password = req.body.password;

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

leelaJs.route('get', '/api/user', (req, res) => {
  const user = USERS.find((singleUser) => singleUser.id === req.userId);
  res.json(user);

  //send the current logged in user details
});

leelaJs.route('put', '/api/user', (req, res) => {});

leelaJs.route('post', '/api/posts', (req, res) => {});
leelaJs.route('delete', '/api/logout', (req, res) => {});

leelaJs.listen(8000, () => {
  console.log(`Server is listening at port 8000`);
});
