const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const agent = req.header("User-Agent");
  const paramName = req.query.name;
  const browserChrome = "Hello Chrome";
  const browserOthers = "Hello Others";

  console.log(req.headers);
  console.log(req.baseUrl);
  console.log(req.hostname);
  console.log(req.protocol);

  if (agent.toLowerCase().match(/chrome/)) {
    res.write(`<div><p>${browserChrome}</p></div>`);
  } else {
    res.write(`<div><p>${browserOthers}</p></div>`);
  }
  res.write(`<div><p>${agent}</p></div>`);
  res.write(`<div><p>${paramName}</p></div>`);
  res.end();
});

app.listen(3000, () => {
  console.log(`Server running at http://127.0.0.1:3000`);
});
