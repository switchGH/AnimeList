//モジュールを拡張機能として読み込む
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = 'http://api.moemoe.tokyo/anime/v1/master/2019/1?ogp=1';

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer();

server.on('request', function(req, res) {

  http.get(url, function(apiRes) {

    let body = '';
    apiRes.setEncoding('utf8');
    
    apiRes.on('data', function(chunk) {
      body += chunk;
    });

    apiRes.on('end', function() {
      let data = {};
      data.animes = JSON.parse(body);
      console.log(data.animes);
      let template = fs.readFileSync('./page.ejs', 'utf-8');
      let page = ejs.render(template, data);
      res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
      res.write(page);
      res.end();
    });
  });
});

server.listen(port, hostname, function() {
  console.log(`Server runnning at http://${hostname}:${port}/`);
});