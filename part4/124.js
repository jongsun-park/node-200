const fs = require("fs");
const data = fs.readFileSync("./message.txt");
const text = data.toString();
console.log("sync work01");
console.log(text);

// sync work01
// hello
// bye
// 안녕
