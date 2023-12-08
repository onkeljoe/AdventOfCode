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

//// Brute force takes too long. //////
/*
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
*/

//// Try find lcm on each single solution ==> only works if every starting point always ends at the same endpoint
const results = [];
waypoints.forEach((route) => {
  let step = 0;
  let way = "";
  // main loop
  do {
    way = instructions.shift();
    instructions.push(way);
    route = routes[route + way];
    step++;
  } while (route[2] !== "Z");
  results.push(step);
});
console.log(results);

// find least common multiple (greatest common divisor method)
const gcd = (a, b) => (b == 0 ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);
const Part2 = results.reduce(lcm, 1);
console.log("Part 2: ", Part2);
