'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req,res) => {
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  req.url = url.parse(req.url);
  console.log('url ', req.url);

  req.url.query = querystring.parse(req.url.query);
  console.log('qs',req.url.query);

  bodyParser(req,(err,body) => {
    console.log('body', body);
    
    res.end();
  });
});

function bodyParser(req,callback){
  switch (req.method){
    case "POST":
      //
      break;
    case "PUT":
      //
      break;
    default:
    req.body = null;
      callback(null,null);
  }
}

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}.`)
});
