const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const result = [];
  const multipleNumber = 9;
  for (let i = 0; i < 5; i++) {
    result.push({
      number: `${multipleNumber}X${i}`,
      multiple: multipleNumber * i,
    });
  }
  res.send(result);
});

app.get("/error", (req, res) => {
  res.status(4040).send("404 Error");
});

app.listen(3000, () => {
  console.log("Server running at http://127.0.0.1:3000");
});
