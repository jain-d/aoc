var fs = require('node:fs');

const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';

let contents;
try {
   contents = fs.readFileSync("./inputD1.txt", "utf8");
} catch(er) {
   console.log(`this error was encountered-> ${er}`)
}
let contentsArray = contents.trim().split("\n");



// partOne
let summation = 0;
for (let value of contentsArray) {
   let firstCharacter = true;
   let calibrationIns;
   let lastCharacter;
   
   for (let character of value) {
      if (+(character) || (+(character) === 0)) {
         if (firstCharacter) {
            calibrationIns = (10 * +(character));
            firstCharacter = false;
         }
         lastCharacter = +(character);
      }
      else {
         continue;
      }
   }
   if (lastCharacter === undefined) {
      lastCharacter = firstCharacter;
   }
   calibrationIns = calibrationIns + lastCharacter;
   summation += calibrationIns;
} 



// partTwo
const objWords = [
   {
      name: "one",
      length: 3,
      value: 1
   },
   {
      name: "two",
      length: 3,
      value: 2

   },
   {
      name: "three",
      length: 5,
      value: 3

   },
   {
      name: "four",
      length: 4,
      value: 4

   },
   {
      name: "five",
      length: 4,
      value: 5

   },
   {
      name: "six",
      length: 3,
      value: 6

   },
   {
      name: "seven",
      length: 5,
      value: 7

   },
   {
      name: "eight",
      length: 5,
      value: 8

   },
   {
      name: "nine",
      length: 4,
      value: 9

   }
];
let samplesP1 = [""];
let samples = ["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen"];
let finalSummation = 0;
let visits = 0;
function searchAlphabets(entry, alphaIndexes) {
   for (let word of objWords) {
      if (entry.includes(word.name)) {
         if (entry.indexOf(word.name) === entry.lastIndexOf(word.name)) {
            alphaIndexes.push(entry.indexOf(word.name));
         } else {
            alphaIndexes.push(entry.indexOf(word.name));
            alphaIndexes.push(entry.lastIndexOf(word.name));
         }
      }
   }
   alphaIndexes.sort(function(a, b){return a - b});
}
function searchNumerals(entry, numericIndexes) {
   for (let focus of entry) {
      if ((+(focus) || (+(focus) === 0)) && !numericIndexes.includes(entry.search(focus))) {
         numericIndexes.push(entry.search(focus));
      }
   }
   numericIndexes.sort(function(a, b){return a - b});
}
function parseCalibrationValue(entry, alphaIndexes, numericIndexes) {
   let tens = 10;
   let zeros = 0;
   if (alphaIndexes.length > 0 && numericIndexes.length > 0) {
      if (alphaIndexes.at(0) > numericIndexes.at(0)) {
         tens *= +(entry[numericIndexes.at(0)]);
      } else {
         for (let word of objWords) {
            if (entry.includes(word.name) && (alphaIndexes.at(0) === entry.search(word.name))) {
               tens *= word.value;
            }
         }
      }
      if (numericIndexes.at(-1) > alphaIndexes.at(-1)) {
         zeros = +(entry[numericIndexes.at(-1)]);
      } else {
         for (let word of objWords) {
            if (entry.includes(word.name) && (alphaIndexes.at(-1) === entry.lastIndexOf(word.name))) {
               zeros = word.value;
            }
         }
      }
      return (tens + zeros);
   } else if (alphaIndexes.length === 0) {
      if (numericIndexes.length > 1) {
         return ((+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(-1)])));
      } else {
         return ((+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(0)])));
      }
   } else if (numericIndexes.length === 0) {
      if (alphaIndexes.length > 2) {
         for (let word of objWords) {
            if (entry.includes(word.name)) {
               if (entry.search(word.name) === alphaIndexes.at(0)) {
                  tens *= word.value;
               }
               else if (entry.search(word.name) === alphaIndexes.at(-1)) {
                  zeros = word.value;
               }
            }
         }
         return (tens + zeros);
      } else if (alphaIndexes.length === 2) {
         for (let word of objWords) {
            if (entry.includes(word.name)) {
               if (entry.search(word.name) === alphaIndexes.at(0)) {
                  if ((alphaIndexes.at(0) + (word.length - 1)) === alphaIndexes.at(-1)) {
                     return ((word.value * 10) + (word.value));
                  }
                  tens *= word.value;
               } else {
                  zeros = word.value;
               }
            }
         }
         return (tens + zeros);
      } else {
         for (let word of objWords) {
            if (entry.includes(word.name)) {
               return ((word.value * 10) + (word.value));
            }
         }
      }
   }
}
for (let sample of contentsArray) {
   let alphaIndexes = [];
   let numericIndexes = [];
   searchAlphabets(sample, alphaIndexes);
   searchNumerals(sample, numericIndexes);
   increaseSummation(sample, alphaIndexes, numericIndexes);
}
function increaseSummation(sample, alphaIndexes, numericIndexes) {
   let calibrationV = 0;
   calibrationV += parseCalibrationValue(sample, alphaIndexes, numericIndexes);
   finalSummation += calibrationV;
   visits += 1;
   console.log(`${visits}. for ${yellow}${sample}${reset},\n\tcalibrationValue: ${blue}${calibrationV}${reset} & value of finalSummation ${green}${finalSummation}${reset}`);
}
console.log(summation);
console.log(finalSummation);
