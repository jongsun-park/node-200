const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World");
  })
  .listen(5000, () => {
    console.log("서버가 동작 중입니다, http://127.0.0.1:5000");
  });
