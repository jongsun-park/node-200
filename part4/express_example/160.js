const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello express module");
});

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000");
});
