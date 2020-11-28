const fs = require("fs");

fs.readFile("./list.json", (err, data) => {
  const list = data.toString();
  console.log(typeof list); // string

  const json = JSON.parse(list);
  console.log(json); // [ { name: '경록', age: 31 }, { name: '지현', age: 31 } ]
  console.log(typeof json); // object

  json.forEach((people) => console.log(people.name + " " + people.age));
  // 경록 31
  // 지현 31
});
