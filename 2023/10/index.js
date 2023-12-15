import fs from "fs";

function checkWaypoint(prev, current) {
  const index = "" + prev + current;
  const ways = {
    "N|": "S",
    NJ: "W",
    NL: "E",
    "N-": "*",
    NF: "*",
    N7: "*",
    "E|": "*",
    EJ: "*",
    EL: "N",
    "E-": "W",
    EF: "S",
    E7: "*",
    "S|": "N",
    SJ: "*",
    SL: "*",
    "S-": "*",
    SF: "E",
    S7: "W",
    "W|": "*",
    WJ: "N",
    WL: "*",
    "W-": "E",
    WF: "*",
    W7: "S",
  };
  return ways[index];
}

function go(x, y, direction) {
  switch (direction) {
    case "N":
      if (y === 0) return { x, y };
      return { x, y: y - 1 };
      break;
    case "E":
      if (x === width - 1) return { x, y };
      return { x: x + 1, y };
      break;
    case "S":
      if (y === height - 1) return { x, y };
      return { x, y: y + 1 };
      break;
    case "W":
      if (x === 0) return { x, y };
      return { x: x - 1, y };
      break;
    default:
      return { x, y };
      break;
  }
}
// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
// const lines = fs.readFileSync("./example2.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const width = lines[0].length;
const height = lines.length;
let steps = 1;
let symbol = "";
let previous = "";
let dir = "";
const opposite = { N: "S", E: "W", S: "N", W: "E" };
const visited = [];

// find S
let point = { x: 0, y: 0 };
lines.forEach((line, y) => {
  let x = line.indexOf("S");
  if (x !== -1) point = { x, y };
});
console.log("Start: ", point);

// find first step
let nextpoint = go(point.x, point.y, "N");
symbol = lines[nextpoint.y][nextpoint.x];
previous = "S";
if ((nextpoint.x === point.x && nextpoint.y === point.y) || symbol === ".") {
  nextpoint = go(point.x, point.y, "E");
  symbol = lines[nextpoint.y][nextpoint.x];
  previous = "W";
  if ((nextpoint.x === point.x && nextpoint.y === point.y) || symbol === ".") {
    nextpoint = go(point.x, point.y, "S");
    symbol = lines[nextpoint.y][nextpoint.x];
    previous = "N";
  }
}
console.log("First: ", nextpoint, " Symbol: ", symbol);
point = nextpoint;
visited.push(point);

// find next
do {
  dir = checkWaypoint(previous, symbol);
  point = go(point.x, point.y, dir);
  symbol = lines[point.y][point.x];
  previous = opposite[dir];
  visited.push(point);
  steps++;
} while (symbol !== "S");
console.log("Steps: ", steps);
console.log("Part1: ", steps / 2);

//Part 2

let inside = 0;
const lineright = "7|JS".split(""); // state of "S" checked manually ;-)
lines.forEach((line, y) => {
  let outside = true;
  const chars = line.split("");
  chars.forEach((dot, x) => {
    if (!visited.find((z) => z.x === x && z.y === y)) {
      if (!outside) inside++;
    } else if (lineright.indexOf(dot) >= 0) {
      outside = !outside;
    }
  });
});
console.log("Part2: ", inside);
// console.log(visited);
