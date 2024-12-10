import fs from "fs";

// const inputfile = fs.readFileSync("./example.txt", "utf-8").split("");
const inputfile = fs.readFileSync("./input.txt", "utf-8").split("");

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
while (index2 > index1) {
  outputfile[index1] = outputfile[index2];
  outputfile[index2] = ".";
  index1 = outputfile.indexOf(".");
  index2 = outputfile.findLastIndex((x) => x !== ".");
}

// checksum
let checksum = 0;
index1 = outputfile.indexOf(".");
for (let k = 0; k < index1; k++) {
  checksum += k * outputfile[k];
}

const sum1 = checksum;
console.log("Teil 1: ", sum1);

// #############################################

const files = [];
const spaces = [];
var position = 0;
let size1, size2;

// expand file
for (let i = 0; i < inputfile.length / 2; i++) {
  size1= Number(inputfile[i * 2]);
  size2= Number(inputfile[i * 2+1]);
  value = { size: size1, position, id: i };
  files.push(value);
  position += size1;
  value = { size: size2, position };
  spaces.push(value);
  position += size2;
}
// remove last element, if size is odd
if (inputfile.length % 2) spaces.pop();

// move files
let outfiles = [];
while(files.length >0) {
  let last = files.pop();
  const space = spaces.find(item => item.size >= last.size && item.position < last.position);
  if (space) {
    last.position = space.position;
    space.position = space.position + last.size;
    space.size = space.size - last.size;
  }
  outfiles.push(last);
}

// checksum
let checksum2 = 0;
outfiles.forEach(file => {
  for(let j=0; j<file.size; j++) {
    checksum2 += (file.position + j) * file.id;
  }
})

const sum2 = checksum2;
console.log("Teil 2: ", sum2);
