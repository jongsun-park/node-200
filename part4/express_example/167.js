const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
// ::ffff:127.0.0.1 - - [01/Dec/2020:22:10:11 +0000] "GET / HTTP/1.1" 200 14 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36"
app.use(morgan("common"));
// ::ffff:127.0.0.1 - - [01/Dec/2020:22:10:11 +0000] "GET / HTTP/1.1" 200 14
app.use(morgan(":method + :date"));
// GET + Tue, 01 Dec 2020 22:10:11 GMT
app.use(morgan(":status + :url"));
// 200 + /

app.use((req, res) => {
  res.send("express morgan");
});

app.listen(3002, () =>
  console.log("Server is running at http://127.0.0.1:3002")
);
