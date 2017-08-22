'use strict';

const http = require('http');
const cowsay = require('cowsay');
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


  bodyParser(req,(err,body,message) => {
    if (message) { console.log(message); }
    const reqContentType = req.headers['content-type'];
    switch (reqContentType){
      case 'application/json':
        try {
          req.body = JSON.parse(body);
          console.log('json',body);
          res.write(message);
        } catch (err) {
          res.writeHead(400);
          res.write(err.message);
          return res.end();
        }
        break;
      case 'text/plain':
        break;
      default:
        console.warn(`Unexpected content-type: ${reqContentType}`);
        res.writeHead(400);
        return res.end();
    }

    res.end();
  });
});

function bodyParser(req,callback){
  switch (req.method){
    case 'POST':
    case 'PUT':
      var body = '';

      req.on('data',buf => {
        body += buf.toString();
      });

      req.on('end',() => callback(null,body,'hello from my server!'));
      req.on('error', err => callback(err));
      break;
    default:
      req.body = null;
      callback(null,null);
  }
}

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}.`);
});
