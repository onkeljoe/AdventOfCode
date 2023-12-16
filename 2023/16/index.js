import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const tiles = [];
const energies = [];
const startpoints = [];

lines.forEach((line, y) => {
  tiles.push(line.split(""));
});
let width = tiles[0].length;
let height = tiles.length;

// init startpoints
for (let m = 0; m < height; m++) {
  startpoints.push({ x: 0, y: m, d: "R" });
  startpoints.push({ x: width - 1, y: m, d: "L" });
}
for (let m = 0; m < width; m++) {
  startpoints.push({ x: m, y: 0, d: "D" });
  startpoints.push({ x: m, y: height - 1, d: "U" });
}

// outer loop
startpoints.forEach((point) => {
  let beamCounter = 0;
  const beams = [[point]];
  //init map
  const energy = [];
  for (let i = 0; i < height; i++) {
    energy[i] = [];
    for (let j = 0; j < width; j++) {
      energy[i][j] = {};
    }
  }

  let currentStep, nextStep, currentSymbol;
  let beamEnd = false;
  currentStep = beams[0][0];
  let stepcounter = 0;

  //run
  do {
    stepcounter++;
    currentSymbol = tiles[currentStep.y][currentStep.x];
    // console.log(stepcounter, currentStep, currentSymbol);
    energy[currentStep.y][currentStep.x][currentStep.d] = true;
    switch (currentStep.d) {
      case "R":
        if (currentSymbol === "." || currentSymbol === "-") {
          nextStep = { x: currentStep.x + 1, y: currentStep.y, d: "R" };
        } else if (currentSymbol === "/") {
          nextStep = { x: currentStep.x, y: currentStep.y - 1, d: "U" };
        } else if (currentSymbol === "\\") {
          nextStep = { x: currentStep.x, y: currentStep.y + 1, d: "D" };
        } else if (currentSymbol === "|") {
          nextStep = { x: currentStep.x, y: currentStep.y - 1, d: "U" };
          if (currentStep.y + 1 < height) {
            beams.push([{ x: currentStep.x, y: currentStep.y + 1, d: "D" }]);
          }
        }
        break;
      case "L":
        if (currentSymbol === "." || currentSymbol === "-") {
          nextStep = { x: currentStep.x - 1, y: currentStep.y, d: "L" };
        } else if (currentSymbol === "/") {
          nextStep = { x: currentStep.x, y: currentStep.y + 1, d: "D" };
        } else if (currentSymbol === "\\") {
          nextStep = { x: currentStep.x, y: currentStep.y - 1, d: "U" };
        } else if (currentSymbol === "|") {
          nextStep = { x: currentStep.x, y: currentStep.y - 1, d: "U" };
          if (currentStep.y + 1 < height) {
            beams.push([{ x: currentStep.x, y: currentStep.y + 1, d: "D" }]);
          }
        }
        break;
      case "U":
        if (currentSymbol === "." || currentSymbol === "|") {
          nextStep = { x: currentStep.x, y: currentStep.y - 1, d: "U" };
        } else if (currentSymbol === "/") {
          nextStep = { x: currentStep.x + 1, y: currentStep.y, d: "R" };
        } else if (currentSymbol === "\\") {
          nextStep = { x: currentStep.x - 1, y: currentStep.y, d: "L" };
        } else if (currentSymbol === "-") {
          nextStep = { x: currentStep.x + 1, y: currentStep.y, d: "R" };
          if (currentStep.x > 0) {
            beams.push([{ x: currentStep.x - 1, y: currentStep.y, d: "L" }]);
          }
        }
        break;
      case "D":
        if (currentSymbol === "." || currentSymbol === "|") {
          nextStep = { x: currentStep.x, y: currentStep.y + 1, d: "D" };
        } else if (currentSymbol === "/") {
          nextStep = { x: currentStep.x - 1, y: currentStep.y, d: "L" };
        } else if (currentSymbol === "\\") {
          nextStep = { x: currentStep.x + 1, y: currentStep.y, d: "R" };
        } else if (currentSymbol === "-") {
          nextStep = { x: currentStep.x + 1, y: currentStep.y, d: "R" };
          if (currentStep.x > 0) {
            beams.push([{ x: currentStep.x - 1, y: currentStep.y, d: "L" }]);
          }
        }
        break;
      default:
        console.log("Error");
    }
    // console.log("Next: ", nextStep);
    if (
      nextStep.x == -1 ||
      nextStep.y == -1 ||
      nextStep.x == width ||
      nextStep.y == height ||
      energy[nextStep.y][nextStep.x][nextStep.d] == true
    ) {
      beamCounter++;
      if (beamCounter >= beams.length) {
        beamEnd = true;
      } else {
        // console.log(
        //   "Beam ",
        //   beamCounter,
        //   " von ",
        //   beams.length,
        //   ": ",
        //   beams[beamCounter]
        // );
        nextStep = beams[beamCounter][0];
      }
    }
    currentStep = nextStep;
    // console.log(stepcounter, nextStep, currentStep);
  } while (!beamEnd);

  let temp = 0;
  energy.forEach((y) => {
    y.forEach((x) => {
      if (x.R || x.L || x.U || x.D) temp++;
    });
  });
  energies.push(temp);
});
let Part1 = energies[0];
let Part2 = energies.reduce((max, x) => (x > max ? x : max), 0);
// console.log(startpoints.length);
// console.log(energies.length);
// for (let index = 0; index < energies.length; index++) {
//   console.log(startpoints[index], ": ", energies[index]);
// }
console.log("Part1: ", Part1);
console.log("Part2: ", Part2);
