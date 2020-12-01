const http = require("http");
const fs = require("fs");
const pug = require("pug");

http
  .createServer((req, res) => {
    fs.readFile(`${__dirname}/157.pug.example2.pug`, "utf-8", (err, data) => {
      const fn = pug.compile(data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fn());
    });
  })
  .listen(5000, () => console.log("Server running at http://127.0.0.1:5000"));
