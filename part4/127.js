const fs = require("fs");

const lists = [1, 2, 3, 4, 5];

lists.forEach((list) => {
  // console.log(`Chapter ${list}`)
  fs.appendFile("./chapters.txt", `Chapter ${list}\n`, (err) =>
    console.log(err)
  );
});
