const http = require("http");

const server = http.createServer();

const port = 4000;

server.listen(port, () => {
  console.log(`서버가 동작 중입니다, http://127.0.0.1:${port}`);
});

const closeServer = () => {
  server.close();
  console.log(`서버가 종료되었습니다, http://127.0.0.1:${port}`);
};

setTimeout(closeServer, 5000);
