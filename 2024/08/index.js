import fs from "fs";

// const rows = fs.readFileSync("./example.txt", "utf-8").split("\r\n");
const rows = fs.readFileSync("./input.txt", "utf-8").split("\r\n");

const matrix = rows.map((row) => row.split(""));
const numrow = rows.length;
const numcol = rows[0].length;

// collect antenna positions
const antennas = {};
const antinodes = [];

for (let row = 0; row < numrow; row++) {
  for (let col = 0; col < numcol; col++) {
    const ant = matrix[row][col];
    if (ant !== ".") {
      if (!antennas[ant]) {
        antennas[ant] = [];
      }
      antennas[ant].push({ col, row });
    }
  }
}

let diffx, diffy;

Object.values(antennas).forEach(ant => {
  if (ant.length > 1) {
    for (let i=0; i<ant.length-1; i++) {
      for (let j=i+1; j<ant.length; j++) {
        diffx=ant[j].col-ant[i].col;
        diffy=ant[j].row-ant[i].row;
        //anti 1: i minus
        const anti1 = {col:ant[i].col-diffx, row:ant[i].row-diffy};
        if (anti1.col >= 0 && anti1.col < numcol && anti1.row >= 0 && anti1.row < numrow) {
          antinodes.push(anti1);
        }
        //anti 2: j plus
        const anti2 = {col:ant[j].col+diffx, row:ant[j].row+diffy};
        if (anti2.col >= 0 && anti2.col < numcol && anti2.row >= 0 && anti2.row < numrow) {
          antinodes.push(anti2);
        }
      }
    }
  }
});

const uniqueArray = antinodes.reduce((acc, coord) => {
  if (!acc.some(item => item.col === coord.col && item.row === coord.row)) {
    acc.push(coord);
  }
  return acc;
}, []);

const sum1 = uniqueArray.length;
console.log("Teil 1: ", sum1);

// #############################################

const antinodes2 = [];

Object.values(antennas).forEach(ant => {
  if (ant.length > 1) {
    for (let i=0; i<ant.length-1; i++) {
      for (let j=i+1; j<ant.length; j++) {
        diffx=ant[j].col-ant[i].col;
        diffy=ant[j].row-ant[i].row;
        //anti 1: i minus
        let anti1 = ant[i]
        while (anti1.col >= 0 && anti1.col < numcol && anti1.row >= 0 && anti1.row < numrow) {
          antinodes2.push(anti1);
          anti1 = {col:anti1.col-diffx, row:anti1.row-diffy};
        }
        //anti 2: j plus
        let anti2 = ant[j]
        while (anti2.col >= 0 && anti2.col < numcol && anti2.row >= 0 && anti2.row < numrow) {
          antinodes2.push(anti2);
          anti2 = {col:anti2.col+diffx, row:anti2.row+diffy};
        }
      }
    }
  }
});

const uniqueArray2 = antinodes2.reduce((acc, coord) => {
  if (!acc.some(item => item.col === coord.col && item.row === coord.row)) {
    acc.push(coord);
  }
  return acc;
}, []);

const sum2 = uniqueArray2.length;;
console.log("Teil 2: ", sum2);
