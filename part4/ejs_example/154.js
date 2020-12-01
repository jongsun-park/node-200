const ejs = require("ejs");
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    // fs.readFile(`${__dirname}/154.example.ejs`, "utf-8", (err, data) => {
    //   if (err) console.log(err);
    //   res.writeHead(200, { "Content-Type": "text/html" });
    //   res.end(ejs.render(data));
    // });
    ejs.renderFile(`${__dirname}/154.example.ejs`, (err, data) => {
      if (err) console.log(err);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
