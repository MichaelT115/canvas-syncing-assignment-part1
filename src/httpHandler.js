const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// Maps extensions to content-types
const extToType = {
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.html': 'text/html',
  '.css': 'text/css',
  '.json': 'application/json',
  '.js': 'application/javascript',
  '.xml': 'text/xml',
};

const GetFile = fileName => new Promise((resolve, reject) => {
  const filePath = path.resolve(`${__dirname}/../client/`, `./${fileName}`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const RequestHandler = (request, response) => {
  console.log(request.url);
  const urlObject = url.parse(request.url, true);
  const pathname = urlObject.pathname === '/' ? '/index.html' : urlObject.pathname;
  const fileExtension = path.extname(pathname);

  GetFile(urlObject.pathname).then(
    (data) => {
      response.writeHead(200, { 'Content-Type': extToType[fileExtension] });
      response.write(data);
      response.end();
    }).catch(
    (err) => {
      throw err;
    });
};

const CreateServer = (PORT) => {
  const server = http.createServer(RequestHandler);

  server.listen(PORT);

  console.log(`listening on port ${PORT}`);

  return server;
};

module.exports.CreateServer = CreateServer;
