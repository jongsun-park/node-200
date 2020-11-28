const userList = [
  { name: "경록", age: 31 },
  { name: "지현", age: 31 },
];

const fs = require("fs");

fs.writeFileSync("./list.json", JSON.stringify(userList), (err) =>
  console.log(err)
);

const data = fs.readFileSync("./list.json");
console.log(JSON.parse(data));
// [ { name: '경록', age: 31 }, { name: '지현', age: 31 } ]
