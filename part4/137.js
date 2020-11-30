const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    fs.readFile("./newyork.jpg", (error, data) => {
      res.writeHead(200, { "Content-Type": "image/jpg" });
      res.end(data);
    });
  })
  .listen(5001, () => {
    console.log(`서버가 동작 중입니다, http://127.0.0.1:5001`);
  });

http
  .createServer((req, res) => {
    fs.readFile("./cullah.mp3", (error, data) => {
      res.writeHead(200, { "Content-Type": "audio/mp3" });
      res.end(data);
    });
  })
  .listen(5002, () => {
    console.log(`서버가 동작 중입니다, http://127.0.0.1:5002`);
  });
