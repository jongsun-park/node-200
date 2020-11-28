const fs = require("fs");
const contents = "hello\nbye\n안녕";
fs.writeFile("./message.txt", contents, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
