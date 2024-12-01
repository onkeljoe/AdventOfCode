import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const firstNumbers = lines.map((line) => {
  return parseInt(line.trim().split(/\s+/)[0], 10);
});
const secondNumbers = lines.map((line) => {
  return parseInt(line.trim().split(/\s+/)[1], 10);
});
firstNumbers.sort();
secondNumbers.sort();
const distances = firstNumbers.map((n1, index) =>
  Math.abs(n1 - secondNumbers[index])
);
const sum1 = distances.reduce((sum, cur) => sum + cur, 0);
console.log("Teil 1: ", sum1);

// #############################################

const similarities = lines.map((line) => {
  const first = parseInt(line.trim().split(/\s+/)[0], 10);
  const filtered = secondNumbers.filter((item) => item === first);
  return first * filtered.length;
});
const sum2 = similarities.reduce((sum, cur) => sum + cur, 0);
console.log("Teil 2: ", sum2);
