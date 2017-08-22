'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);
  res.end();
});

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}`);
});
