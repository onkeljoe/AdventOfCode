import fs from "fs";

// const line = fs.readFileSync("./example.txt", "utf-8");
const line = fs.readFileSync("./input.txt", "utf-8");

const regex = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const matches = line.match(regex);
const regex2 = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/;
const pairs = matches.map((item) => {
  const match = item.match(regex2);
  return match[1] * match[2];
});
const sum1 = pairs.reduce((sum, item) => sum + item, 0);
console.log("Teil 1: ", sum1);

// #############################################

const regex3 = /don't\(\)[^]*?do\(\)/g;
const line2 = (line+'do()').replace(regex3, "");
const matches2 = line2.match(regex);
const pairs2 = matches2.map((item) => {
  const match = item.match(regex2);
  return match[1] * match[2];
});const sum2 = pairs2.reduce((sum, item) => sum + item, 0);
console.log("Teil 2: ", sum2);
