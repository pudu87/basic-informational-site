const http = require('http');
const path = require('path')
const fs = require('fs');
const PORT = 8080;

const server = http.createServer((req, res) => {  
  let pathName;
  if (path.extname(req.url) === '.css') {
    pathName = './public/styles.css';
    res.setHeader('Content-Type', 'text/css');
  } else {
    pathName = './views/';
    res.setHeader('Content-Type', 'text/html')
    switch(req.url) {
      case '/':
        pathName += 'index.html';
        res.statusCode = 200;
        break;
      case '/about':
        pathName += 'about.html';
        res.statusCode = 200;
        break;
      case '/contact-me':
        pathName += 'contact-me.html';
        res.statusCode = 200;
        break;
      default:
        pathName += '404.html';
        res.statusCode = 404;
      break;
    }
  }

  fs.readFile(pathName, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  })
});

server.listen(PORT, 'localhost', () => {
  console.log(`server running at ${PORT}`)
})