import fs from "fs";

// const lines = fs.readFileSync("./example3.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const instructions = lines.shift().split("");
const emptyline = lines.shift();
const routes = {};
lines.forEach((line) => {
  const key = line.substring(0, 3);
  const value1 = line.substring(7, 10);
  const value2 = line.substring(12, 15);
  routes[key + "L"] = value1;
  routes[key + "R"] = value2;
});
let step = 0;
// find all ending at "A"
let waypoints = [];
lines.forEach((line) => {
  if (line.substring(2, 3) === "A") waypoints.push(line.substring(0, 3));
});
let way = "";
// main loop
do {
  way = instructions.shift();
  instructions.push(way);
  // inner loop
  waypoints.forEach((route, ix) => {
    waypoints[ix] = routes[route + way];
  });
  step++;
  // console.log(waypoints);
} while (!waypoints.reduce((bool, x) => bool && x[2] === "Z", true));
console.log("Part2: ", step);
