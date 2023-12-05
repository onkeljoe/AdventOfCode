import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");
const blockborders = [];
const blocks = [];
const seeds = lines[0].split(": ")[1].split(" ");
lines.forEach((line, row) => {
  if (line === "") blockborders.push(row);
});
blockborders.push(lines.length);
for (let block = 0; block < blockborders.length - 1; block++) {
  const header = lines[blockborders[block] + 1];
  const body = [];
  for (let i = blockborders[block] + 2; i < blockborders[block + 1]; i++) {
    body.push(lines[i].split(" ").map(Number));
  }
  blocks.push({ header, body });
}
const mappings = seeds.map((seed) => [Number(seed)]);
mappings.forEach((seed, sx) => {
  blocks.forEach((block, bx) => {
    const search = seed[seed.length - 1];
    const found = block.body.find((x) => {
      const low = x[1];
      const high = x[1] + x[2];
      return search >= x[1] && search < x[1] + x[2];
    });
    const diff = found ? found[0] - found[1] : 0;
    seed.push(search + diff);
  });
});
const locations = mappings.map((x) => x[x.length - 1]);
const part1 = Math.min(...locations);
console.log("Part 1: ", part1);
