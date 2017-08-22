'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const server = http.createServer((req, res) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  if(req.url.pathname === '/'){
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    res.write('hello from my server!');
    res.end();
  }
  else if(req.url.pathname === '/cowsay'){
    if(req.method === 'GET' && req.url.query.text){
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.write(cowsay.say(req.url.query));
      res.end();
    }
    else if(req.method === 'POST' && req.headers['content-type'] === 'application/json') {
      bodyParser(req, (err,body) =>{
        if(body.length){
          var textyBody = body.filter(item => {
            return item.text;
          });
          if(textyBody.length > 0){
            res.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            textyBody.forEach(thing => {
              res.write(cowsay.say(thing));
              res.write(`\r\n`);
            });
            return res.end();
          }
          else{
            badRequestHedgehog(res);
          }
        }
        else{
          if(body.text){
            res.writeHead(200, {
              'Content-Type': 'text/plain',
            });
            res.write(cowsay.say(body));
            return res.end();
          }
          else{
            badRequestHedgehog(res);
          }
        }
      });
    }
    else {
      badRequestHedgehog(res);
    }
  }
  else{
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write(cowsay.say({ text: 'No cows here!', f: 'stegosaurus' }));
    res.end();
  }
});

function badRequestHedgehog(res){
  res.writeHead(400, {
    'Content-Type': 'text/plain',
  });
  res.write(cowsay.say({ text: 'bad request', f: 'hedgehog' }));
  res.end();
}


function bodyParser(req, callback) {
  let body = '';
  req.on('data', buf => {
    body += buf.toString();
  });
  req.on('end', () => callback(null, JSON.parse(body)));
  req.on('error', err => callback(err));
}

server.listen(PORT, () => {
  console.log(`HTTP listening on ${PORT}`);
});
