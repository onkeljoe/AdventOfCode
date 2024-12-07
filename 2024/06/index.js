import fs from "fs";

// const rows = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const rows = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const matrix = rows.map((row) => row.split(""));
const numrow = rows.length;
const numcol = rows[0].length;
let steps = 0;
const directions = [
  { dir: "up", icon: "^", line: "|", next: "right", dx: 0, dy: -1 },
  { dir: "right", icon: ">", line: "_", next: "down", dx: 1, dy: 0 },
  { dir: "down", icon: "v", line: "I", next: "left", dx: 0, dy: 1 },
  { dir: "left", icon: "<", line: "-", next: "up", dx: -1, dy: 0 },
];
// console.log (matrix);

// find start and direction
let posx = 0,
  posy = 0,
  direction = "no";
outerLoop: for (let row = 0; row < numrow; row++) {
  for (let col = 0; col < numcol; col++) {
    const move = matrix[row][col];
    // console.log (move);
    if (move !== "." && move !== "#") {
      posx = col;
      posy = row;
      direction = directions.find((dir) => dir.icon === move);
      // beide for-Schleifen verlassen
      break outerLoop;
    }
  }
}
console.log("Start: ", posx, posy, direction);
const posx2 = posx;
const posy2 = posy;
const direction2 = direction;

// loop move until out of borders
do {
  if (matrix[posy][posx] === "#") {
    // blocked, 1 step back, turn right, 1 step in new direction
    posx = posx - direction.dx;
    posy = posy - direction.dy;
    direction = directions.find((dir) => dir.dir === direction.next);
    posx = posx + direction.dx;
    posy = posy + direction.dy;
    steps++;
    // console.log(posx, posy, direction);
  } else {
    // move forward
    matrix[posy][posx] = "X";
    posx = posx + direction.dx;
    posy = posy + direction.dy;
    steps++;
  }
} while (posx >= 0 && posx < numcol && posy >= 0 && posy < numrow);

//finish
// const result = matrix.map(line => line.join("")).join("\r\n");
// console.log(result)
const distincts = matrix.flat().filter((item) => item === "X").length;
const sum1 = distincts;
console.log("Teil 1: ", sum1);

// #############################################

let infinityLoops = 0;

for (let row = 0; row < numrow; row++) {
  for (let col = 0; col < numcol; col++) {
    const matrix2 = rows.map((row) => row.split(""));
    if (matrix2[row][col] === ".") {
      matrix2[row][col] = "#";
      // console.log("New obstacle: ", row, col);
      posx = posx2;
      posy = posy2;
      direction = direction2;
      let infinity = false;
      do {
        if (matrix2[posy][posx] === "#") {
          // blocked, 1 step back, turn right, 1 step in new direction
          posx = posx - direction.dx;
          posy = posy - direction.dy;
          matrix2[posy][posx] = "+";
          direction = directions.find((dir) => dir.dir === direction.next);
          posx = posx + direction.dx;
          posy = posy + direction.dy;
          steps++;
          // console.log(posx, posy, direction);
        } else {
          // move forward
          if (matrix2[posy][posx] === direction.line) {infinity = true;}
          if (matrix2[posy][posx] !== "+") matrix2[posy][posx] = direction.line;
          posx = posx + direction.dx;
          posy = posy + direction.dy;
          steps++;
        }
      } while (
        posx >= 0 &&
        posx < numcol &&
        posy >= 0 &&
        posy < numrow &&
        !infinity
      );
      matrix2[row][col] = "O";
      if (infinity) {
        infinityLoops++;
        // const result = matrix2.map((line) => line.join("")).join("\r\n");
        // console.log(result);
        // console.log(infinityLoops);
      }
      matrix2[row][col] = ".";
    }
  }
}

const sum2 = infinityLoops;
console.log("Teil 2: ", sum2);
