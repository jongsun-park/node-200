const testFolder = "./";
const fs = require("fs");

const files = fs.readdirSync(testFolder);

files.forEach((file) => console.log(file));
