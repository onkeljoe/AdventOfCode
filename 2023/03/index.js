import fs from "fs";

function checkPartNum(row, col) {
  const part =
    partNumberList.find(
      (x) =>
        row === x.row && col >= x.col && col < x.col + x.value.toString().length
    ) || null;
  return part?.count || null;
}

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
let indices = [];
let lineCount = lines.length;
let count = 1;
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
      count: count,
    });
    count++;
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
const gears = [];
lines.forEach((line, row) => {
  for (let col = 0; col < line.length; col++) {
    if (line[col] === "*") gears.push({ row, col });
  }
});

const ratios = [];
gears.forEach((gear) => {
  // check for neighbour numbers
  const startrow = gear.row === 0 ? 0 : gear.row - 1;
  const endrow = gear.row === lineCount - 1 ? lineCount - 1 : gear.row + 1;
  const startcol = gear.col === 0 ? 0 : gear.col - 1;
  const len = lines[gear.row].length;
  const endcol = gear.col === len - 1 ? len - 1 : gear.col + 1;
  const neighbours = [];
  let part;
  for (let trow = startrow; trow <= endrow; trow++) {
    for (let tcol = startcol; tcol <= endcol; tcol++) {
      const pixel = lines[trow][tcol];
      if (/[0-9]/.test(pixel)) part = checkPartNum(trow, tcol);
      if (part) neighbours.push(part);
    }
  }
  const distinct = Array.from(new Set(neighbours));
  if (distinct.length === 2)
    ratios.push(
      indices[distinct[0] - 1].value * indices[distinct[1] - 1].value
    );
});
const part2 = ratios.reduce((sum, x) => sum + x, 0);
console.log("Part 2: ", part2);
