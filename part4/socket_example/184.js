const app = require("express")();
const server = require("http").createServer(app);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/183_socket.html`);
});

const io = require("socket.io")(server);

io.on("connection", (client) => {
  console.log(`Client connection`);
  client.on("disconnect", () => {
    console.log("Client disconnection");
  });
});

server.listen(3000, () => {
  console.log("Server is running at http://127.0.0.1:3000");
});
