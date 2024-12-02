import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
let reports = lines.map((line) => line.split(/\s+/));
reports = reports.map((report) => report.map(Number));
let safeReports = 0;
reports.forEach((report) => {
  const line = [];
  for (let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i - 1];
    line.push(diff);
  }
  if (
    line.every((number) => number > 0 && number < 4) ||
    line.every((number) => number < 0 && number > -4)
  )
    safeReports++;
});
const sum1 = safeReports;
console.log("Teil 1: ", sum1);

// #############################################
let safeReports2 = 0;
reports.forEach((report) => {
  const line = [];
  for (let i = 1; i < report.length; i++) {
    let diff = report[i] - report[i - 1];
    line.push(diff);
  }
  if (
    line.every((number) => number > 0 && number < 4) ||
    line.every((number) => number < 0 && number > -4)
  ) {
    safeReports2++;
  } else {
    let check = false;
    const leaveSingle = report.map((_, index) =>
      report.filter((_, i) => i !== index)
    );
    leaveSingle.forEach((single) => {
      const line2 = [];
      for (let i = 1; i < single.length; i++) {
        let diff = single[i] - single[i - 1];
        line2.push(diff);
      }
      if (
        line2.every((number) => number > 0 && number < 4) ||
        line2.every((number) => number < 0 && number > -4)
      )
        check = true;
    });
    if (check) safeReports2++;
  }
});
const sum2 = safeReports2;
console.log("Teil 2: ", sum2);
