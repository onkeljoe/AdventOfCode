import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const matrix = lines.map((line) => line.split(""));
const lineCount = lines.length;
const columnCount = lines[0].length;
const columns = [];
for (let i = 0; i<columnCount; i++) {
  const col = lines.map((line) => line[i]);
  columns.push(col.join(""));
}
// Diagonale rechts oben -> links unten, oberes Dreieck
const diagLeft = [];
for (let startCol = columnCount-1; startCol>=0; startCol--) {
  let diag = [];
  for (let row = 0, col=startCol; row < lineCount && col >= 0; row++, col--) {
    diag.push(matrix[row][col]);
  }
  diagLeft.push(diag.join(""));
}
// Diagonale rechts oben -> links unten, unteres Dreieck
for (let startRow = 1; startRow<lineCount; startRow++) {
  let diag = [];
  for (let row = startRow, col=columnCount-1; row < lineCount && col >= 0; row++, col--) {
    diag.push(matrix[row][col]);
  }
  diagLeft.push(diag.join(""));
}
// Diagonale links oben -> rechts unten, oberes Dreieck
const diagRight = [];
for (let startCol = 0; startCol<columnCount; startCol++) {
  let diag = [];
  for (let row = 0, col=startCol; row < lineCount && col < columnCount; row++, col++) {
    diag.push(matrix[row][col]);
  }
  diagRight.push(diag.join(""));
}
// Diagonale links oben -> rechts unten, unteres Dreieck
for (let startRow = 1; startRow<lineCount; startRow++) {
  let diag = [];
  for (let row = startRow, col=0; row < lineCount && col < columnCount; row++, col++) {
    diag.push(matrix[row][col]);
  }
  diagRight.push(diag.join(""));
}

let count = 0;
lines.forEach((item) => {
  let matches = item.match(/XMAS/g);
  if (matches) count += matches.length;
  let matches2 = item.match(/SAMX/g);
  if (matches2) count += matches2.length;
});
columns.forEach((item) => {
  let matches = item.match(/XMAS/g);
  if (matches) count += matches.length;
  let matches2 = item.match(/SAMX/g);
  if (matches2) count += matches2.length;
});
diagRight.forEach((item) => {
  let matches = item.match(/XMAS/g);
  if (matches) count += matches.length;
  let matches2 = item.match(/SAMX/g);
  if (matches2) count += matches2.length;
});
diagLeft.forEach((item) => {
  let matches = item.match(/XMAS/g);
  if (matches) count += matches.length;
  let matches2 = item.match(/SAMX/g);
  if (matches2) count += matches2.length;
});
const sum1 = count;
console.log("Teil 1: ", sum1);

// #############################################

const sum2 = 0;
console.log("Teil 2: ", sum2);
