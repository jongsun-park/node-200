const request = require("request");
const http = require("http");

http
  .createServer((req, res) => {
    request(
      {
        url: "https://www.google.com/search",
        method: "GET",
        qs: { q: "신사역 맛집" },
      },
      (error, response, body) => {
        res.writeHead(200, { "Content-Typ": "text/html" });
        res.end(body);
      }
    );
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
