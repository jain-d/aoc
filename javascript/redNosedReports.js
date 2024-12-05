import {c} from "../../javascript/colors.js";

// Part One
let safeReports = 0;

let fileData = Bun.file("./tests.txt");
let textContent = await fileData.text();
let reports = textContent.trim().split("\n");

let safeVariance = {
   atLeast: 1,
   atMost: 3
};

for (let report of reports) {
   let arrayedReport = report.trim().split(" ");
   if (+(arrayedReport.at(0)) < +(arrayedReport.at(-1))) {
      for (let i = 0; i < (arrayedReport.length - 1); i++) {
         if ((+(arrayedReport[i + 1]) - +(arrayedReport[i]) > safeVariance.atMost) || (+(arrayedReport[i + 1]) - +(arrayedReport[i]) < safeVariance.atLeast)) {
            break;
         }
         if (i === (arrayedReport.length - 2)) {
            safeReports += 1;
         }
      }
   } else if (+(arrayedReport.at(0)) > +(arrayedReport.at(-1))) {
      for (let i = 0; i < (arrayedReport.length - 1); i++) {
         if ((+(arrayedReport[i]) - +(arrayedReport[i + 1]) > safeVariance.atMost) || (+(arrayedReport[i]) - +(arrayedReport[i + 1]) < safeVariance.atLeast)) {
            break;
         }
         if (i === (arrayedReport.length - 2)) {
            safeReports += 1;
         }
      }
   } else {
      continue;
   }
}
console.log(safeReports);

// Rebuilding Part One, brain was not working to extend previous solution for Part Two
let safeReportsAgain = 0;
for (let report of reports) {
   let arrayedReport = report.trim().split(" ");
   let positiveDiff = 0;
   let negativeDiff = 0;
   for (let i = 0; i < (arrayedReport.length - 1); i++) {
      let diff = +(arrayedReport[i + 1]) - +(arrayedReport[i]);

      if ((Math.abs(diff) >= safeVariance.atLeast) && (Math.abs(diff) <= safeVariance.atMost)) {
         if (diff > 0) {
            positiveDiff += 1;
         } else {
            negativeDiff += 1;
         }
      } else {
         break;
      }
   }
   if (positiveDiff == (arrayedReport.length - 1) || negativeDiff == (arrayedReport.length - 1)) {
      safeReportsAgain += 1;
   }
}
console.log(safeReportsAgain);

// Part Two
let increasedSafeReports = 0;

for (let report of reports) {
   let arrayedReport = report.trim().split(" ");
   let badLevels = 0;
   let positiveDiff = 0;
   let negativeDiff = 0;
   for (let i = 0; i < (arrayedReport.length - 1); i++) {
      let diff = +(arrayedReport[i + 1]) - +(arrayedReport[i]);
      if (Math.abs(diff) >= safeVariance.atLeast && Math.abs(diff) <= safeVariance.atMost) {
         if (diff > 0) {
            positiveDiff += 1;
         } else {
            negativeDiff += 1;
         }
      } else {
         badLevels += 1;
      }
   }
   if (positiveDiff == (arrayedReport.length - 1) || negativeDiff == (arrayedReport.length - 1)) {
      increasedSafeReports += 1;
   }
}

console.log(increasedSafeReports);
