import fs from "fs";

// const inputfile = fs.readFileSync("./example.txt", "utf-8").split("");
const inputfile = fs.readFileSync("./input.txt", "utf-8").split("").reverse();

const outputfile = [];
let blank = false;
let nextnum = 0;
let nextcount, value;

// expand file
for (let i = 0; i < inputfile.length; i++) {
  nextcount = inputfile[i];
  if (blank) {
    value = ".";
  } else {
    value = nextnum++;
  }
  for (let j = 0; j < nextcount; j++) {
    outputfile.push(value);
  }
  blank = !blank;
}

// condense file
let index1 = outputfile.indexOf(".");
let index2 = outputfile.findLastIndex((x) => x !== ".");
console.log(index1, index2);
while (index2 > index1) {
  outputfile[index1] = outputfile[index2];
  outputfile[index2] = ".";
  index1 = outputfile.indexOf(".");
  index2 = outputfile.findLastIndex((x) => x !== ".");
  // console.log(index1, index2);
}
// console.log(outputfile.join(""));

// checksum
let checksum = 0;
index1 = outputfile.indexOf(".");
for (let k = 0; k < index1; k++) {
  checksum += (k * outputfile[k]);
}

const sum1 = checksum;
console.log("Teil 1: ", sum1, "<== fail");

// #############################################

const sum2 = 0;
console.log("Teil 2: ", sum2);
