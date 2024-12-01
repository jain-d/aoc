import {c} from "../../javascript/colors.js";

let smallInput = 
`3   4
4   3
2   5
1   3
3   9
3   3`;

let leftList = [];
let rightList = [];
let summation = 0;
let contents = Bun.file("../input/day1.txt");
let fileData = await contents.text();
let arrayedFileData = fileData.trim().split("\n");

for (let entry of arrayedFileData) {
   leftList.push(entry.split("   ")[0]);
   rightList.push(entry.split("   ")[1]);
}
leftList.sort();
rightList.sort();

for (let i = 0; i < leftList.length; i++) {
   summation += (Math.abs(leftList[i] - rightList[i]));
}
console.log(summation);
