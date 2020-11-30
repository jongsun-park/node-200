// 서버 생성
// req.url -> index page or example page

const fs = require("fs");
const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    // req.url === url.parse(req.url).pathname
    if (url.parse(req.url).pathname === "/example") {
      fs.readFile("./136.example.html", (err, data) => {
        res.end(data);
      });
    } else {
      fs.readFile("./138.index.html", (err, data) => res.end(data));
    }
  })
  .listen(5000, console.log("Server Running at http://127.0.0.1:5000"));
