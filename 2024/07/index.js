import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

// split input in result and operands
const data = lines.map((line) => {
  return {
    res: Number(line.split(":")[0]),
    op: line.split(":")[1].trim().split(" ").map(Number),
  };
});

// try operands
let validSum = 0;
data.forEach((set) => {
  set.op.reverse();
  set.step = [set.op.pop()];
  while (set.op.length > 0) {
    const operand = set.op.pop();
    set.step = set.step.map((item) => [item + operand, item * operand]).flat();
  }
  if (set.step.includes(set.res)) validSum += set.res;
});

const sum1 = validSum;
console.log("Teil 1: ", sum1);

// #############################################

const data2 = lines.map((line) => {
  return {
    res: Number(line.split(":")[0]),
    op: line.split(":")[1].trim().split(" ").map(Number),
  };
});

// 3 operands
validSum = 0;
data2.forEach((set) => {
  set.op.reverse();
  set.step = [set.op.pop()];
  while (set.op.length > 0) {
    const operand = set.op.pop();
    set.step = set.step.map((item) => [item + operand, item * operand,Number(item.toFixed()+operand.toFixed())]).flat();
  }
  if (set.step.includes(set.res)) validSum += set.res;
});

const sum2 = validSum;
console.log("Teil 2: ", sum2);
