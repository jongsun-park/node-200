const http = require("http");

http
  .createServer((req, res) => {
    if (req.headers.cookie) {
      const cookie = req.headers.cookie.split(";").map((element) => {
        element = element.split("=");
        return {
          name: element[0],
          value: element[1],
        };
      });
      res.end(`<h1>${JSON.stringify(cookie)}</h1>`);
      // [{"name":"soju","value":"pork"},{"name":" beer","value":"chicken"}]
    }

    if (!req.headers.cookie) {
      res.writeHead(200, {
        "Content-Type": "text/html",
        "Set-Cookie": ["soju=pork", "beer=chicken"],
      });
      res.end(`<h1>Created Cookie</h1>`);
    }
  })
  .listen(5000, () => {
    console.log("Server running at http://127.0.0.1:5000");
  });
