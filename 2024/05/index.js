import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

// split input in rules and sequences
const breakline = lines.findIndex((line) => line === "");
const rules = lines.slice(0, breakline);
const sequences = lines.slice(breakline + 1);

// rules
const ruleset = [];
for (let i = 0; i < 100; i++) {
  ruleset[i] = [];
}
rules.forEach((rule) => {
  const values = rule.split("|");
  ruleset[values[0]].push(values[1]);
});

// sequences
const results = [];
sequences.forEach((line) => {
  const values = line.split(",");
  let valid = true;
  // compare each possible pair
  for (let left = 0; left < values.length - 1; left++) {
    for (let right = left + 1; right < values.length; right++) {
      if (ruleset[values[right]].includes(values[left])) valid = false;
    }
  }
  const result = {
    valid,
    center: valid ? Number(values[(values.length - 1) / 2]) : 0,
    values,
  };
  results.push(result);
});
const sum1 = results.reduce((sum, item) => sum + item.center, 0);
console.log("Teil 1: ", sum1);

// #############################################

// list only contains false arrays
const list = results.filter((item) => !item.valid).map((item) => item.values);

var centerSum = 0;
list.forEach((line) => {
  // bubblesort
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < line.length - 1; i++) {
      if (ruleset[line[i + 1]].includes(line[i])) {
        let temp = line[i + 1];
        line[i + 1] = line[i];
        line[i] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  // now array is sorted
  centerSum += Number(line[(line.length - 1) / 2]);
});

const sum2 = centerSum;
console.log("Teil 2: ", sum2);
