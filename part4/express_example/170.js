const express = require("express");
const parseurl = require("parseurl");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "keyboard dog",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((request, response, next) => {
  if (!request.session.views) {
    request.session.views = {};
  }
  console.log(request.session);
  const pathname = parseurl(request).pathname;
  request.session.views[pathname] = (request.session.views[pathname] || 0) + 1;
  next();
});

app.get("/", (req, res) => res.redirect("/puddle"));

app.get(`/puddle`, (req, res) => {
  res.send(
    `Hello puddle! you viewd this page ${req.session.views["/puddle"]} times`
  );
});

app.get(`/biggle`, (req, res) => {
  res.send(
    `Hello biggle! you viewd this page ${req.session.views["/biggle"]} times`
  );
});

app.listen(3005, () => {
  console.log(`Server is running at http://127.0.0.1:3005`);
});
