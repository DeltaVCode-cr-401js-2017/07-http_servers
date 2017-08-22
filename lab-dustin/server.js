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


  bodyParser(req,(err,body) => {

    const reqContentType = req.headers['content-type'];
    switch (reqContentType){
      case 'application/json':
        try {
          req.body = JSON.parse(body);
          console.log('json',body);
          if (req.url.pathname === '/cowsay'){
            console.log(cowsay.say(JSON.parse(body)));
            res.write(cowsay.say(JSON.parse(body)));
          } else {
            res.writeHead(200,{ 'Content-Type': reqContentType });
            res.write(body);
          }
        } catch (err) {
          res.writeHead(400);
          res.write(err.message);
        }
        return res.end();

      case 'text/plain':
        try {
          console.log('text',body);
          if (req.url.pathname === '/cowsay'){
            console.log(cowsay.say({text: body}));
            res.write(cowsay.say({text: body}));
          } else {
            res.writeHead(200,{ 'Content-Type': reqContentType });
            res.write(body);
            return res.end();
          }
        } catch (err) {
          console.error(err);
          res.writeHead(400);
          res.write(err.message);
        }
        return res.end();

      default:
        console.warn(`Unexpected content-type: ${reqContentType}`);
        res.writeHead(400);
        return res.end();
    }
  });
});

function bodyParser(req,callback){
  var body = '';
  switch (req.method){
    case 'POST':
    case 'PUT':
      req.on('data',buf => {
        body += buf.toString();
      });

      req.on('end',() => callback(null,body));
      req.on('error', err => callback(err));
      break;
    case 'GET':
      req.on('end',() => {
        callback(null,body);
      });
      break;
    default:
      req.body = null;
      callback(null,null);
  }
}

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}.`);
});
