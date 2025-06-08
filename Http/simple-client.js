const http = require('node:http');

const agent = new http.Agent({ keepAlive: true });

const request = http.request({
  agent,
  hostname: 'localhost',
  port: 8050,
  method: 'POST',
  path: '/create-post',
  headers: {
    'content-type': 'application/json',
    name: 'joe'
  }
});

//event will be fired only once
request.on('response', (response) => {
  console.log('Status COde', response.statusCode);
  console.log('---HEADERS ---');
  console.log(response.headers);
  console.log('------Body ------');
  response.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  response.on('end', () => {
    console.log('response data finished ');
  });
});

request.end(JSON.stringify({ title: 'sample post heading', body: 'sample post body' }));
