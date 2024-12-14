import fs from "fs";

function move(bot, max_x, max_y) {
  bot.x += bot.dx;
  bot.y += bot.dy;
  if (bot.x < 0) bot.x += max_x;
  if (bot.y < 0) bot.y += max_y;
  if (bot.x >= max_x) bot.x -= max_x;
  if (bot.y >= max_y) bot.y -= max_y;
  return bot;
}

const processKeyPress = () => {
  return new Promise((resolve) => {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    const onKeyPress = (key) => {
      if (key === " ") {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdin.removeListener("data", onKeyPress);
        resolve(); // reslove promise
      } else if (key === "\u0003") {
        // Ctrl+C
        console.log("Programm wird beendet.");
        process.exit();
      }
    };
    process.stdin.on("data", onKeyPress);
  });
};

// const rows = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const rows = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const xmax = 101;
const ymax = 103;
const seconds = 100;
const matrix = [];
const robots = [];

for (let i = 0; i < ymax; i++) {
  matrix.push(new Array(xmax).fill(0));
}

const regex = /p=(-?\d+),(-?\d+)\sv=(-?\d+),(-?\d+)/;

// init robots
rows.forEach((robot) => {
  const data = robot.match(regex);
  if (data) {
    const x = parseInt(data[1], 10);
    const y = parseInt(data[2], 10);
    robots.push({ x, y, dx: parseInt(data[3], 10), dy: parseInt(data[4], 10) });
    matrix[y][x] += 1;
  }
});

// move robots
for (let sec = 1; sec <= seconds; sec++) {
  matrix.forEach((row) => row.fill(0));
  robots.forEach((bot) => {
    bot = move(bot, xmax, ymax);
    matrix[bot.y][bot.x] += 1; // Part 1
  });
}

// count and calculate
const quadrants = [
  { no: 1, x1: 0, x2: (xmax - 3) / 2, y1: 0, y2: (ymax - 3) / 2, count: 0 },
  { no: 2, x1: (xmax + 1) / 2, x2: xmax - 1, y1: 0, y2: (ymax - 3) / 2, count: 0 },
  { no: 3, x1: 0, x2: (xmax - 3) / 2, y1: (ymax + 1) / 2, y2: ymax - 1, count: 0 },
  { no: 4, x1: (xmax + 1) / 2, x2: xmax - 1, y1: (ymax + 1) / 2, y2: ymax - 1, count: 0 },
];

robots.forEach((bot) => {
  quadrants.forEach((q) => {
    if (bot.x >= q.x1 && bot.x <= q.x2 && bot.y >= q.y1 && bot.y <= q.y2) q.count++;
  });
});

const sum1 = quadrants.reduce((prod, q) => prod * q.count, 1);
console.log("Teil 1: ", sum1);

// #############################################

const matrix2 = [];
const robots2 = [];

for (let i = 0; i < ymax; i++) {
  matrix2.push(new Array(xmax).fill(" "));
}

// init robots2
rows.forEach((robot) => {
  const data = robot.match(regex);
  if (data) {
    const x = parseInt(data[1], 10);
    const y = parseInt(data[2], 10);
    robots2.push({ x, y, dx: parseInt(data[3], 10), dy: parseInt(data[4], 10) });
    matrix2[y][x] += 1;
  }
});


// move robots
let sum2 = 0;
for (let sec = 1; sec <= 10000; sec++) { // try 1000, then 10000 => found
  matrix2.forEach((row) => row.fill(" "));
  robots2.forEach((bot) => {
    bot = move(bot, xmax, ymax);
    matrix2[bot.y][bot.x] = "*"
  });
  for (let row of matrix2) {
    // look for suspicious patterns, hope the tree is filled, not outline
    if (row.join("").includes("*********")) { // tried 3, 5 and 7 stars, but instant find with 9
      console.log(sec, " sec:\n");
      const matrix2Print = matrix2.map((row) => row.join(""));
      // print ASCII image
      console.log(matrix2Print);
      sum2 = sec;
      await processKeyPress(); // wait for space bar
      break;
    }
  }
}

console.log("Teil 2: ", sum2);
