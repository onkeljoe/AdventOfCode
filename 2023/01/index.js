import fs from "fs";

const nums = [
  { text: "1", val: 1 },
  { text: "2", val: 2 },
  { text: "3", val: 3 },
  { text: "4", val: 4 },
  { text: "5", val: 5 },
  { text: "6", val: 6 },
  { text: "7", val: 7 },
  { text: "8", val: 8 },
  { text: "9", val: 9 },
  { text: "one", val: 1 },
  { text: "two", val: 2 },
  { text: "three", val: 3 },
  { text: "four", val: 4 },
  { text: "five", val: 5 },
  { text: "six", val: 6 },
  { text: "seven", val: 7 },
  { text: "eight", val: 8 },
  { text: "nine", val: 9 },
];

function findNumbers(line) {
  let xleft = [];
  let xright = [];
  nums.forEach((x) => {
    const y = line.indexOf(x.text);
    const z = line.lastIndexOf(x.text);
    if (y > -1) xleft.push({ index: y, value: x.val });
    if (z > -1) xright.push({ index: z, value: x.val });
  });
  const first = xleft.reduce(
    (x, min) => (x.index < min.index ? x : min),
    xleft[0]
  ).value;
  const last = xright.reduce(
    (x, max) => (x.index > max.index ? x : max),
    xright[0]
  ).value;
  return Number(first * 10 + last);
}

// const lines = fs.readFileSync("./example2.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const numbers = lines.map((line) => {
  const first = line.match(/\d/) || [""];
  const last = line.match(/\d(?=\D*$)/) || [""];
  return Number(first[0] + last[0]);
});
const sum = numbers.reduce((x, sum) => sum + x, 0);
console.log("Teil 1: ", sum);

// #############################################

const numbers2 = lines.map((line) => findNumbers(line));
const sum2 = numbers2.reduce((x, sum) => sum + x, 0);

// console.log(numbers2);
console.log("Teil 2: ", sum2);
