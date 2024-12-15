import fs from "fs";

// const rows = fs.readFileSync("./small.txt", "utf-8").split("\r\n");
// const rows = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const rows = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

// setup
const breakline = rows.indexOf("");
const matrix = rows.slice(0, breakline).map((row) => row.split(""));
const moves = rows.slice(breakline + 1).join("");
const directions = [
  { icon: "^", dx: 0, dy: -1 },
  { icon: "v", dx: 0, dy: 1 },
  { icon: ">", dx: 1, dy: 0 },
  { icon: "<", dx: -1, dy: 0 },
];

// robot start position
let robot = { x: 0, y: 0 };
for (let row = 0; row < breakline; row++) {
  let col = rows[row].indexOf("@");
  if (col >= 0) {
    robot.x = col;
    robot.y = row;
    break;
  }
}

// robot moves
let nextpos = { x: 0, y: 0 };
let dir, spot;
for (let step = 0; step < moves.length; step++) {
  dir = directions.find((x) => moves[step] === x.icon);
  nextpos = { x: robot.x + dir.dx, y: robot.y + dir.dy };
  // console.log(nextpos, dir);
  switch (matrix[nextpos.y][nextpos.x]) {
    case "#":
      // don't move
      // console.log("dont move");
      break;
    case ".":
      // just move robot
      matrix[nextpos.y][nextpos.x] = "@";
      matrix[robot.y][robot.x] = ".";
      robot = nextpos;
      // console.log("move to free");
      break;
    case "O":
      // check if able to push
      // look ahead same direction for "."
      spot = nextpos;
      do {
        spot = { x: spot.x + dir.dx, y: spot.y + dir.dy };
        if (matrix[spot.y][spot.x] === ".") {
          //push boxes
          matrix[spot.y][spot.x] = "O";
          matrix[nextpos.y][nextpos.x] = "@";
          matrix[robot.y][robot.x] = ".";
          robot = nextpos;
          // console.log("push boxes");
          break;
        } else if (matrix[spot.y][spot.x] === "#") {
          // don't move, no space left
          // console.log("dont move");
          break;
        }
      } while (matrix[spot.y][spot.x] === "O");
      break;
    default:
      // irregular icon, don't move
      // console.log("irregular icon");
  }
  // console.log(matrix.map(x=>x.join("")));
}
console.log(matrix.map(x=>x.join("")));

let sum1 = 0;
for (let row=0; row < matrix.length; row++) {
  for (let col=0; col < matrix[0].length; col++) {
    if (matrix[row][col] === "O") {
      sum1 += (100*row + col);
    }
  }
}
console.log("Teil 1: ", sum1);

// #############################################

const sum2 = 0;
console.log("Teil 2: ", sum2);
