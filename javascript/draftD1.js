var fs = require("node:fs");
// drafting solution for part 2
const red = '\x1b[31m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const blue = '\x1b[34m';
const reset = '\x1b[0m';
const passed = '\x1b[32mPASSED\x1b[0m'; 
const failed = '\x1b[31mFAILED\x1b[0m';
let results;


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
let samples = ["two1nine", "eightwothree", "abcone2threexyz", "xtwone3four", "4nineeightseven2", "zoneight234", "7pqrstsixteen", "1abc2", "treb7uchet", "pqr3stu8vwx", "a1b2c3d4e5f", "sixthree84three", "twokdkcbhtqxfc87rkgctwo"];
let sample = "fivednzg85eightseveneightfive";
let expectedOutput = 63;

let contents;
try {
   contents = fs.readFileSync("./input.txt", "utf8");
} catch (err) {
   console.log(`this error was encountered -> ${err}`);
}
let contentsArray = contents.trim().split("\n");

let summation = 0;
function searchAlphabets(entry, alphaIndexes) {
   console.log('inside of searchAlphabets function');
   for (let word of objWords) {
      console.log("looping for a word match");
      if (entry.includes(word.name)) {
         if (entry.indexOf(word.name) === entry.lastIndexOf(word.name)) {
            alphaIndexes.push(entry.indexOf(word.name));
            console.log("found an entry");
         } else {
            alphaIndexes.push(entry.indexOf(word.name));
            alphaIndexes.push(entry.lastIndexOf(word.name));
            console.log("found multiple entires of the same kind");
         }
      }
   }
   console.log(`value of AlphaIndex after looping and before sorting ${alphaIndexes} and length ${alphaIndexes.length}`);
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
      console.log(`\nfor ${entry}, inside mixed condition`);
      if (alphaIndexes.at(0) > numericIndexes.at(0)) {
         tens *= +(entry[numericIndexes.at(0)]);
         console.log(`tens in numeral, ${tens}`);
      } else {
         for (let word of objWords) {
            if (entry.includes(word.name) && (alphaIndexes.at(0) === entry.search(word.name))) {
               tens *= word.value;
               console.log(`tens in Alphabetic, ${tens}`);
            }
         }
      }
      console.log(`now entering for zeros value`);
      if (numericIndexes.at(-1) > alphaIndexes.at(-1)) {
         zeros = +(entry[numericIndexes.at(-1)]);
         console.log(`zeros is numeral, ${zeros}`);
      } else {
         console.log(`zero should be Alphabetic`);
         for (let word of objWords) {
            if (entry.includes(word.name) && (alphaIndexes.at(-1) === entry.lastIndexOf(word.name))) {
               zeros = word.value;
               console.log(`zeros is Alphabetic, ${zeros}`);
            }
         }
      }
      console.log(`returnValue ${tens + zeros}`);
      return (tens + zeros);
   } else if (alphaIndexes.length === 0) {
      console.log(`\nfor ${entry}, inside purely NUMERIC condition.`);
      if (numericIndexes.length > 1) {
         console.log(`returnValue ${(+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(-1)]))}`);
         return ((+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(-1)])));
      } else {
         console.log(`returnValue ${((+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(0)])))}`);
         return ((+(entry[numericIndexes.at(0)]) * 10) + (+(entry[numericIndexes.at(0)])));
      }
   } else if (numericIndexes.length === 0) {
      console.log(`\nfor ${entry}, inside purely ALPHABETICAL condition.`);
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
         console.log(`returnValue ${tens + zeros}`);
         return (tens + zeros);
      } else if (alphaIndexes.length === 2) {
         for (let word of objWords) {
            if (entry.includes(word.name)) {
               if (entry.search(word.name) === alphaIndexes.at(0)) {
                  if ((alphaIndexes.at(0) + (word.length - 1)) === alphaIndexes.at(-1)) {
                     console.log(`returnValue ${((word.value * 10) + (word.value))}`);
                     return ((word.value * 10) + (word.value));
                  }
                  tens *= word.value;
               } else {
                  zeros = word.value;
               }
            }
         }
         console.log(`returnValue ${tens + zeros}`);
         return (tens + zeros);
      } else {
         for (let word of objWords) {
            if (entry.includes(word.name)) {
               console.log(`returnValue ${((word.value * 10) + (word.value))}`);
               return ((word.value * 10) + (word.value));
            }
         }
      }
   }
}




//for (let sample of contentsArray) {
   console.log(`for ${yellow}${sample}${reset}`);
   let alphaIndexes = [];
   let numericIndexes = [];
   searchAlphabets(sample, alphaIndexes);
   searchNumerals(sample, numericIndexes);
   summation += parseCalibrationValue(sample, alphaIndexes, numericIndexes);

   console.log(`alphaIndex ${blue}${alphaIndexes}${reset} and numericIndex ${green}${numericIndexes}${reset}\n`);

//}
console.log(summation);
//console.log(`\n\n\tExpected Output: ${expectedOutput}\n\tCalculated Sum: ${summation}\n\n\t${results = summation === expectedOutput ? passed : failed}\n\n`);
/*
let entires = 0;
let firstAlphaIndex = 100;
let alphaTensValue = 0;
let firstNumeralIndex = 100;
let numeralTensValue = 0;
let tensValue = 0;
for (let word of objWords) {
   if (sample.includes(word.name)) {
      entires += 1;
      if (sample.search(word.name) < firstAlphaIndex) {
         firstAlphaIndex = sample.search(word.name);
         alphaTensValue = word.value * 10;
      }
   }
}
for (let letter of sample) {
   if (+(letter)) {
      firstNumeralIndex = firstNumeralIndex > sample.search(letter) ? sample.search(letter) : firstNumeralIndex;
      numeralTensValue = +(letter) * 10;
      break;
   }
}
if (firstAlphaIndex > firstNumeralIndex) {
   tensValue = numeralTensValue;
} else {
   tensValue = alphaTensValue;
}
console.log(`\nthis is the tens Value ${red}${tensValue}${reset}\n`);
//console.log(`\n\tfor ${yellow}${sample}${reset} we have ${green}${entires}${reset} entires.`);
console.log(`\nfor the entry ${yellow}${sample}${reset}`);
console.log(`\n\tnumeralIndex at ${green}${firstNumeralIndex}${reset} and alphaIndex at ${green}${firstAlphaIndex}${reset}`);
*/
