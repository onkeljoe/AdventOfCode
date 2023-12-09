import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

let Part1 = 0;
let Part2 = 0;
lines.forEach((line) => {
  const values = [];
  let row = 0;
  values[0] = line.split(/\s+/).map(Number);
  let final = true;
  do {
    values[row + 1] = [];
    for (let i = 1; i < values[row].length; i++) {
      values[row + 1].push(values[row][i] - values[row][i - 1]);
    }
    row++;
    final = values[row].reduce((bool, x) => bool && x === 0, true);
  } while (!final);
  const result = values.reduce((sum, x) => sum + x[x.length - 1], 0);
  Part1 += result;

  // Part 2
  let prev = 0;
  for (let i = values.length - 1; i >= 0; i--) {
    const x = values[i].unshift(prev);
    if (i !== 0) prev = values[i - 1][0] - prev;
  }
  Part2 += prev;
});

console.log("Part1: ", Part1);
console.log("Part2: ", Part2);
