import fs from "fs";

// const lines = fs.readFileSync("./example2.txt", "utf-8").split("\r\n");
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
let route = "AAA"; // Part 1
let way = "";
// main loop
do {
  way = instructions.shift();
  instructions.push(way);
  route = routes[route + way];
  step++;
} while (route !== "ZZZ");
console.log("Part1: ", step);
