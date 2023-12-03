import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
let indices = [];
let lineCount = lines.length;
lines.forEach((line, row) => {
  let numbers = line.split(/[^\d]+/).filter((str) => str.length > 0);
  let lastindex = 0;
  numbers.forEach((number) => {
    let index = line.indexOf(number, lastindex);
    lastindex = index + 1;
    indices.push({
      value: Number(number),
      row: row,
      col: index,
      isPartNumber: false,
    });
  });
});

indices.forEach((index) => {
  const min = index.col > 0 ? index.col - 1 : 0;
  const max = index.col + index.value.toString().length + 1;
  // check previous line
  if (index.row > 0) {
    const check1 = lines[index.row - 1].substring(min, max);
    if (/[^0-9.]/.test(check1)) index.isPartNumber = true;
  }
  // check letters before and after
  const check2 = lines[index.row].substring(min, max);
  if (/[^0-9.]/.test(check2)) index.isPartNumber = true;
  // check following line
  if (index.row < lineCount - 1) {
    const check3 = lines[index.row + 1].substring(min, max);
    if (/[^0-9.]/.test(check3)) index.isPartNumber = true;
  }
});
const partNumberList = indices.filter((index) => index.isPartNumber);
const part1 = partNumberList.reduce((sum, x) => sum + x.value, 0);
console.log("Part 1: ", part1);

//// Part 2

// find gears
// check for neighbour numbers
// check line above and below
// if count adjacent numbers === 2 add gear value to array
