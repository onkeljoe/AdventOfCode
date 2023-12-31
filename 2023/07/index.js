import fs from "fs";

function evaluate(input) {
  // const strengths = "23456789TJQKA"; // Part 1
  const strengths = "J23456789TQKA"; // Part 2
  const types = ["11111", "21110", "22100", "31100", "32000", "41000", "50000"];
  let result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let hex = "";
  for (let i = 0; i < input.length; i++) {
    const index = strengths.indexOf(input[i]);
    result[index] += 1;
    hex += index.toString(16);
  }
  const jokers = result[0];
  const type = types
    .indexOf(result.sort().reverse().join("").substring(0, 5))
    .toString(16);
  let newtype; // Part 2 only
  switch (jokers) {
    case 5:
      newtype = "6";
      break;
    case 4:
      newtype = "6";
      break;
    case 3:
      newtype = type == "4" ? "6" : "5";
      break;
    case 2:
      if (type == "4") {
        newtype = "6";
      } else if (type == "2") {
        newtype = "5";
      } else newtype = "3";
      break;
    case 1:
      if (type == "5") {
        newtype = "6";
      } else if (type == "3") {
        newtype = "5";
      } else if (type == "2") {
        newtype = "4";
      } else if (type == "1") {
        newtype = "3";
      } else newtype = "1";
      break;
    default:
      newtype = type;
  }
  // hex = type + hex; // Part 1
  hex = newtype + hex; // Part 2
  return parseInt(hex, 16);
}

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const games = [];

lines.forEach((line) => {
  const cards = line.trim().split(" ")[0];
  const bid = line.trim().split(" ")[1];
  const game = {
    cards,
    bid,
    strength: evaluate(cards),
  };
  games.push(game);
});

games.sort((a, b) => a.strength - b.strength);
games.forEach((game, index) => (game.value = (index + 1) * game.bid));
// console.log(games);
// const Part1 = games.reduce((sum, x) => sum + x.value, 0);
// console.log("Part 1: ", Part1);
const Part2 = games.reduce((sum, x) => sum + x.value, 0);
console.log("Part 2: ", Part2);
