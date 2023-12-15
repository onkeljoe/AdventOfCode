import fs from "fs";

// const lines = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const lines = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const inputs = lines[0].split(",");
let Part1 = 0;
inputs.forEach((input) => {
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    value = ((value + input.charCodeAt(i)) * 17) % 256;
  }
  Part1 += value;
});

// rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7

function hash(input) {
  let value = 0;
  for (let i = 0; i < input.length; i++) {
    value = ((value + input.charCodeAt(i)) * 17) % 256;
  }
  return value;
}

function operate(operation, box, label, focus) {
  var pos2 = Boxes[box].findIndex((obj) => obj.label === label);
  if (operation == "remove") {
    if (pos2 >= 0) {
      Boxes[box].splice(pos2, 1);
    }
  } else if (operation == "add") {
    if (pos2 >= 0) {
      Boxes[box][pos2] = { label, focus };
    } else {
      Boxes[box].push({ label, focus });
    }
  }
}

function show() {
  Boxes.forEach((box, ix) => {
    if (box.length > 0) {
      let output = "Box " + ix + ": ";
      box.forEach((lens) => {
        output += "[" + lens.label + " " + lens.focus + "] ";
      });
      console.log(output);
    }
  });
}

function calculate() {
  let sum = 0;
  Boxes.forEach((box, ix) => {
    if (box.length > 0) {
      box.forEach((lens, ix2) => {
        let power = (ix + 1) * (ix2 + 1) * lens.focus;
        // console.log(power);
        sum += power;
      });
    }
  });
  return sum;
}

//init boxes
const Boxes = [];
for (let i = 0; i < 256; i++) {
  Boxes[i] = [];
}

// loop
inputs.forEach((input) => {
  let pos1 = input.indexOf("-");
  let op = "remove";
  let focus = 0;
  if (pos1 < 0) {
    // equal
    pos1 = input.indexOf("=");
    op = "add";
    focus = Number(input.substring(pos1 + 1));
  }
  let label = input.substring(0, pos1);
  let box = hash(label);
  // console.log('After "' + input + '":');
  // console.log(op, box, label, focus);
  operate(op, box, label, focus);
  // show();
});

const Part2 = calculate();
console.log("Part1: ", Part1);
console.log("Part2: ", Part2);
