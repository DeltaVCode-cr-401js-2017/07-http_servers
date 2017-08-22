![DV](https://www.deltavcodeschool.com/wp-content/uploads/DeltaV.png) Lab 07: Vanilla HTTP Server
======

## Submission Instructions
  * fork this repository & create a new branch for your work
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

## Learning Objectives  
* students will be able to identify key qualities of the HTTP protocol
* students will be able to implement an HTTP server using the node.js `http` module

## Requirements
#### Configuration  
<!-- list of files, configurations, tools, etc that are required -->
Your lab directory must include  
* `.gitignore`
* `.eslintrc`
* `package.json`
* `README.md`

Your `package.json` must include `scripts` for:
* `lint`
* `test`

#### Feature Tasks  
* create an HTTP Server using the NodeJS `http` module
* create a *custom* body parsing module that is used for parsing the body of all **POST** requests
* for all requests made to `/`, the server should respond with the following:
  * a header containing `Content-Type: text/plain`
  * a status code of **200**
  * a response with the string "hello from my server!"
* for all **GET** requests made to `/cowsay`, the server should respond with the following:
  * the query string should have the key value `text=<message>`
  * the response header should include `Content-Type: text/plain`
  * if the query `text=messsage` is set, respond with:
    * a status code of 200
    * a response body that includes the value returned from `cowsay.say({ text: <querystring text> })`
  * if the query `text=message` is **not** set, respond with:
    * status code = 400
    * a body including the value returned from `cowsay.say({ text: 'bad request' })`
* for all **POST** requests made to `/cowsay`, the server should respond with the following:
  * the response header should include `Content-Type: text/plain`
  * if the JSON `{text: messsage}` is set in the body, respond with:
    * a status code of 200
    * a response body including the value returned from `cowsay.say({ text: <querystring text> })`
  * if the JSON `{text: messsage}` is **not** set in the body, respond with:
      * a status code of 400
      * a body including the value returned from `cowsay.say({ text: 'bad request' })`

## Bonus
* **2pts:** add the ability to change the cowfile - **ex: dragon, sheep, etc** _(note: this should be done through the querystring)_
