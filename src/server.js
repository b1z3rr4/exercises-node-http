const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const host = 'localhost';
const port = 8000;

const dirFiles = path.resolve(__dirname, 'pages');

const routes = {
  '/home': fs.readFileSync(dirFiles + '/index.html', 'utf-8'),
  '/about': fs.readFileSync(dirFiles + '/about.html', 'utf-8'),
  '404': fs.readFileSync(dirFiles + '/404.html', 'utf-8')
}

const server = http.createServer((req, res)=>{
    const my_url = req.url;
    const urlParse = url.parse(my_url);
    const param = urlParse.path;

    const params = {
      '/home': '/home',
      '/': '/home',
      '/about': '/about',
      'undefined': '404'
    }

    const page = routes[params[params[param]]];

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(page);
});

server.listen(port, host, ()=>{
  console.log(`Server is running on https://${host}:${port}`);
})