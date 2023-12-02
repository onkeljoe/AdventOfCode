import fs from "fs";

const available = { red: 12, green: 13, blue: 14 };
const successList = [];
const powersList = [];

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
lines.forEach((line) => {
  const id = line.split(":")[0].split(" ")[1];
  const sets = line.split(":")[1].split(";");
  let gamePossible = true;
  let minimums = { red: 0, green: 0, blue: 0 };

  sets.forEach((set) => {
    let revealed = { red: 0, green: 0, blue: 0 };
    const draws = set.trimStart().split(", ");
    draws.forEach((draw) => {
      const parts = draw.split(" ");
      revealed[parts[1]] = Number(parts[0]);
      revealed.game = Number(id);
      revealed.possible =
        revealed.red <= available.red &&
        revealed.green <= available.green &&
        revealed.blue <= available.blue;
      gamePossible = gamePossible && revealed.possible;
      minimums.red = Math.max(minimums.red, revealed.red);
      minimums.green = Math.max(minimums.green, revealed.green);
      minimums.blue = Math.max(minimums.blue, revealed.blue);
    });
  });
  if (gamePossible) successList.push(Number(id));
  powersList.push(minimums.red * minimums.green * minimums.blue);
});

const sum = successList.reduce((x, sum) => sum + x, 0);
const sum2 = powersList.reduce((x, sum) => sum + x, 0);
console.log("Part 1 - Sum of possible = ", sum);
console.log("Part 2 - Powers Sum = ", sum2);
