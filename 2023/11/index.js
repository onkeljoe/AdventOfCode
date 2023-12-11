import fs from "fs";

function between(x, a, b) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return x > min && x < max;
}

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

// find galaxies
const galaxies = [];
lines.forEach((line, y) => {
  line.split("").forEach((dot, x) => {
    if (dot === "#") galaxies.push({ x, y });
  });
});
// console.log(galaxies);

// find empty
const emptyRows = [];
const emptyCols = [];
for (let i = 0; i < lines.length; i++) {
  if (!galaxies.find((star) => star.y === i)) emptyRows.push(i);
}
for (let i = 0; i < lines[0].length; i++) {
  if (!galaxies.find((star) => star.x === i)) emptyCols.push(i);
}
console.log("Rows: ", emptyRows);
console.log("Cols: ", emptyCols);

// find distances
let expandfactor = 999999;
let Part1 = 0;
let Part2 = 0;
for (let star1 = 0; star1 < galaxies.length - 1; star1++) {
  for (let star2 = star1 + 1; star2 < galaxies.length; star2++) {
    const dist =
      Math.abs(galaxies[star1].x - galaxies[star2].x) +
      Math.abs(galaxies[star1].y - galaxies[star2].y);
    const expandRows = emptyRows.filter((row) =>
      between(row, galaxies[star1].y, galaxies[star2].y)
    ).length;
    const expandCols = emptyCols.filter((col) =>
      between(col, galaxies[star1].x, galaxies[star2].x)
    ).length;
    const total = dist + expandCols + expandRows;
    const total2 = dist + expandfactor * expandCols + expandfactor * expandRows;
    //console.log("Dist ",galaxies[star1],galaxies[star2]," # ",star1 + 1,star2 + 1," is ",dist,expandRows,expandCols," in sum ",total);
    Part1 += total;
    Part2 += total2;
  }
}
// sum
console.log("Part1: ", Part1);
console.log("Part2: ", Part2);
