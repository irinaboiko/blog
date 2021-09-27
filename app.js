const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log("Server request");

  response.setHeader("Content-Type", "text/html");

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  let basePath = '';

  switch (request.url) {
    case '/':
    case '/home':
      basePath = createPath('index');
      response.statusCode = 200;
      break;
    case '/about-us':
      response.statusCode = 301;
      response.setHeader('Location', '/contacts');
      response.end();
      break;
    case '/contacts':
      basePath = createPath('contacts');
      response.statusCode = 200;
      break;
    default:
      basePath = createPath('error');
      response.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (error, data) => {
    if (error) {
      console.log(error);
      response.statusCode = 500;
      response.end();
    } else {
      response.write(data);
      response.end();
    }
  })
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`Listening port ${PORT}`);
});