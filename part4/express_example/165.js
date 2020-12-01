const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// application/x=www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false })); // parsing the url-encoded data with the queryString library
// application/json 파싱
app.use(bodyParser.json());

// __dirname/login/login.html
// http://127.0.0.1:3000/login.html
app.use(express.static(`${__dirname}/login`));

app.use((request, response) => {
  const userId = request.body.userId || request.query.userId;
  const userPassword = request.body.password || request.query.password;

  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.write(`<h1>Login ID와 PW 값 입니다.</h1>`);
  response.write(`<h1><p>${userId}</p></h1>`);
  response.write(`<h1><p>${userPassword}</p></h1>`);
  response.end(JSON.stringify(request.body, null, 2));
});

app.listen(3000, () => {
  console.log("Server is running at http://127.0.0.1:3000");
});
