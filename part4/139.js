const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    console.log(req.method);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`${JSON.stringify(query)}`);
  })
  .listen(5000, () => {
    console.log("Server running at 5000");
  });
