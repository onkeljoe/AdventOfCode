import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const times = lines[0].split(":")[1].trim().split(/\s+/);
const distances = lines[1].split(":")[1].trim().split(/\s+/);
const victories = [];
for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const winDist = distances[i];
  const results = [];
  for (let race = 0; race <= time; race++) {
    const dist = race * (time - race);
    results.push({ dist, won: dist > winDist ? 1 : 0 });
  }
  const victory = results.reduce((sum, x) => sum + x.won, 0);
  victories.push(victory);
}
const part1 = victories.reduce((prod, x) => prod * x, 1);
console.log("Part 1: ", part1);

/////////////// Part 2 //////////////////
const time2 = Number(lines[0].replace(/ /g, "").split(":")[1]);
const distance2 = Number(lines[1].replace(/ /g, "").split(":")[1]);
let victories2 = 0;
for (let race = 0; race <= time2; race++) {
  if (race * (time2 - race) > distance2) victories2++;
}
console.log("Part 2: ", victories2);
