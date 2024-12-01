let leftList = [];
let rightList = [];
let summation = 0;
let contents = Bun.file("../input/day1.txt");
let fileData = await contents.text();
let arrayedFileData = fileData.trim().split("\n");

// Part One
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

// Part Two
let finalSummation = 0;
let lastCount = 0;
for (let i = 0; i < leftList.length; i++) {
   let count = 0;
   if (i > 0 && leftList[i] === leftList[i - 1]) {
      finalSummation += lastCount;
      continue;
   }
   let startingIndex = rightList.indexOf(leftList[i]);
   if (startingIndex >= 0) {
      for (let j = startingIndex; j < rightList.length; j++) {
         if (rightList[j] > leftList[i]) {
            break;
         } else {
            count++;
         }
      }
   }
   finalSummation += (count * +(leftList[i]));
   lastCount = (count * +(leftList[i]));
}
console.log(finalSummation);
