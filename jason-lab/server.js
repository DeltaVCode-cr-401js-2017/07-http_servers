'use strict';

const http = require('http');
const PORT = process.env.port || 3000;

const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) =>{
  console.log('req.url', req.url);
  console.log('req.method', req.method);

  req.url = url.parse(req.url);
  console.log('url', req.url);

  req.url.query = querystring.parse(req.url.query);
  console.log('qs', req.url.query);

  bodyParser(req, (err, body) => {
    if (err){
      res.writeHead(500);
      res.write(err.toString());
    }

    const cowsay = require('cowsay');
    const reqContentType = req.headers['content-type'];

    switch(reqContentType){
      case 'application/json':
        console.log(`${reqContentType}`, body);
        try {
          if(req.method === 'GET' && req.url.pathname === '/'){
            res.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            res.write('Welcome to my server!');
            res.end();
          }
          if(req.method === 'GET' && req.url.pathname === '/cowsay'){
            if(!req.url.query.text){
              res.writeHead(400);
              res.write(cowsay.say({ text: 'bad request' }));
              return res.end();
            }
            res.writeHead(200, {
              'Content-Type': 'text/plain'
            });
            res.write(cowsay.say({text: req.url.query.text}));
            return res.end();
          }

          if (req.method === 'POST' && req.url.pathname === '/cowsay') {
            req.body = JSON.parse(body);

            console.log(req.body);

            res.writeHead(200, {
              'Content-Type': 'application/json',
            });
            res.write(cowsay.say());
            return res.end();
          }
        }
        catch (err){
          res.writeHead(400);
          res.write(err.message);
          console.log(err);
          return res.end();
        }
        break;

      case 'text/plain':
        res.write(body);
        console.log(`${reqContentType}`, body);
        return res.end();
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(req.url.toString());
    console.log('body', body);

    res.end();
  });
});

function bodyParser(req, callback){
  switch (req.method){
    case 'POST':
      var body = '';
      req.on('data', buf =>{
        body += buf.toString();
        console.log(buf);
      });
      req.on('end', ()=>{
        callback(null, body);
      });
      req.on('error', err =>{
        callback(err);
      });
      break;
    default:
      req.body = null;
      callback(null, null);

  }
}

server.listen(PORT, () =>{
  console.log(`HTTP listening on ${PORT}`);
});
