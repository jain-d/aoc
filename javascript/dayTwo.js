var fs = require("node:fs");

let contents = fs.readFileSync("../input/inputD2.txt", "utf8");
let contentsArray = contents.trim().split("\n");

for (let line of contentsArray) {
   let gameId = line.split(":")[0].split(" ").at(-1);
   let gamePossibility = true;
   for (let show of line.split(":")[1].split(";")) {
      console.log(`${show} for gameID ${gameId}`);
   }
}
