const fs = require("fs");
const http = require("http");

const port = 5000;

http
  .createServer((req, res) => {
    fs.readFile("./136.example.html", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
  });
