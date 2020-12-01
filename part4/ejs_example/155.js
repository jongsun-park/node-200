const http = require("http");
const ejs = require("ejs");
const fs = require("fs");

http
  .createServer((res, req) => {
    fs.readFile(`${__dirname}/155.example.ejs`, "utf-8", (error, data) => {
      req.writeHead(200, { "Content-Type": "text/html" });
      req.end(
        ejs.render(data, {
          table_name: "Multiplication table 19 X",
          number: "19",
        })
      );
    });
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
