const http = require("http");
const { toNamespacedPath } = require("path");

const port = 5000;

const server = http.createServer();

server.on("request", () => {
  console.log("Request");
});
server.on("connection", () => {
  console.log("Connection");
});
server.on("close", () => {
  console.log("Close");
});

server.listen(port, () => {
  console.log(`서버가 동작 중입니다, http://127.0.0.1:${port}`);
});

const testClose = () => {
  server.close();
  console.log(`서버가 종료 되었습니다, http://127.0.0.1:${port}`);
};

setTimeout(testClose, 10000);
