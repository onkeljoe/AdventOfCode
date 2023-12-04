import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
let pointsum = 0;
const linecount = lines.length;
const cardsums = new Array(linecount + 1).fill(1);
cardsums[0] = 0;

lines.forEach((line) => {
  const card = line.split(/[:|]/);
  const index = Number(card[0].split(/\s+/)[1]);
  const winning = card[1].trim().split(/\s+/).map(Number);
  const playing = card[2].trim().split(/\s+/).map(Number);
  const common = winning.filter((x) => playing.includes(x));
  const power = common.length;
  // part 1
  const points = power === 0 ? 0 : 2 ** (power - 1);
  pointsum += points;
  // part 2
  const factor = cardsums[index];
  for (let i = index + 1; i <= index + power; i++) {
    if (i <= linecount) cardsums[i] += factor;
  }
});
const cards = cardsums.reduce((sum, x) => sum + x, 0);

console.log("Part 1: ", pointsum);
console.log("Part 2: ", cards);
