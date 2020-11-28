const fs = require("fs");

const renameFile = (from_name, to_name) => {
  fs.rename(from_name, to_name, (err) => console.log(err));
};

const from = "./hello.txt";
const to = "./bye.txt";

renameFile(from, to);
