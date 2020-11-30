const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const method = req.method;
    if (method === "GET") {
      fs.readFile("./140.example.html", (err, data) => {
        res.writeHead(200, "text/html");
        res.end(data); // 읽은 파일
      });
    }

    if (method === "POST") {
      req.on("data", (data) => {
        console.log(data); // Buffer // 입력된 데이터
        res.writeHead(200, "text/html");
        res.end(data); // 새로운 화면
      });
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
