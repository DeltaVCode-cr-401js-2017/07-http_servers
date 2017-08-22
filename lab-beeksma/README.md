# Day 07 Lab -- HTTP Servers

This project sets up a simple HTTP server and will process specific types of requests.

Any method of request made to '/' will return a response in text/plain of 'hello from my server!'

Any request made to anywhere but '/' or '/cowsay' will return a response in text/plain of 'No cows here!' with a stegosaurus.

GET requests to '/cowsay' including a text value in the querystring will return a cow saying that text.  Any of the other valid cowsay options will also work, e will change the eyes, T will change the tongue, and f will change the file used to generate the cow graphic.  try f=dragon for example.

POST requests to '/cowsay' with a body in valid JSON and at least one JSON object containing a text key will create a cow saying the value for that key. Any of the other valid cowsay options will also work when sent as keys in objects containing text keys, e will change the eyes, T will change the tongue, and f will change the file used to generate the cow graphic.  try f=dragon for example.
