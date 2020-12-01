const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Set-Cookie": ["soju = pork", "beer = chicken"],
    });
    res.end(`<h1>${req.headers.cookie}</h1>`);
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
