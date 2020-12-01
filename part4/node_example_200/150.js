const request = require("request");
const http = require("http");
const iconv = require("iconv-lite");

http
  .createServer((req, res) => {
    request(
      {
        url: "https://www.google.com/search",
        method: "GET",
        qs: { q: "신사역 맛집" },
        encoding: null,
      },
      (error, response, body) => {
        res.writeHead(200, { "Content-Typ": "text/html" });
        const decodedResult = iconv.decode(body, "euc-kr");
        res.end(decodedResult);
      }
    );
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
