import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const inputs = lines[0].split(",");
let Part1 = 0;
inputs.forEach((input) => {
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    value = ((value + input.charCodeAt(i)) * 17) % 256;
  }
  Part1 += value;
});

const Part2 = 0;
console.log("Part1: ", Part1);
console.log("Part2: ", Part2);
