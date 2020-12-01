const express = require("express");

const app = express();

app.get("/one", (req, res) => {
  res.send(`<a href="/two">Street 200</a>`);
});

app.get("/two", (req, res) => {
  res.send(`<a href="/one">Street 100</a>`);
});

app.get("/three/:number", (req, res) => {
  res.send(`${req.params.number} Street`);
});

app.get("/four/:number", (req, res) => {
  res.send(`${req.params.number} Street`);
});

app.listen(3001, () => {
  console.log(`Server is running at http://127.0.0.1:3001`);
});
