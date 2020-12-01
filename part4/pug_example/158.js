const http = require("http");
const fs = require("fs");
const pug = require("pug");

http
  .createServer((req, res) => {
    fs.readFile(`${__dirname}/158.pug.example.pug`, "utf-8", (err, data) => {
      const fn = pug.compile(data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        fn({
          table_name: "Multiplication table 19 X",
          number: "19",
        })
      );
    });
  })
  .listen(5000, () => console.log("Server running at http://127.0.0.1:5000"));
