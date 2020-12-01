const http = require("http");
const pug = require("pug");
const fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile(`${__dirname}/156.pug.example.pug`, "utf-8", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      const fn = pug.compile(data);
      res.end(fn());
    });
  })
  .listen(5000, () => console.log("Server running at http://127.0.0.1:5000"));
