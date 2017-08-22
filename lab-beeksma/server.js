'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  req.url = url.parse(req.url);
  console.log('url', req.url);

  req.url.query = querystring.parse(req.url.query);
  console.log('qs', req.url.query);

  if(req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write('hello from my server!');
    res.end();
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}`);
});
