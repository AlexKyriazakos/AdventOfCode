const fs = require("fs");

const input = fs
  .readFileSync("input3.txt")
  .toString()
  .split("\r\n")
  .filter((s) => s.length > 0);

let pos = 0;
let trees = 0;
for (let i = 1; i < input.length; i++) {
  pos += 3;
  pos = pos >= input[i].length ? pos - input[i].length : pos;
  if (input[i][pos] === "#") trees++;
}

console.log(`Part 1: ${trees} trees`);

let posArray = [0, 0, 0, 0];
let treesArray = [0, 0, 0, 0];
let pos4 = 0;
let trees4 = 0;
for (let i = 1; i < input.length; i++) {
  posArray[0] += 1;
  posArray[1] += 3;
  posArray[2] += 5;
  posArray[3] += 7;
  posArray = posArray.map((el) =>
    el >= input[i].length ? el - input[i].length : el
  );
  treesArray = treesArray.map((tree, index) => {
    return input[i][posArray[index]] === "#" ? tree + 1 : tree;
  });

  if (i % 2 === 0) {
    pos4 += 1;
    pos4 = pos4 >= input[i].length ? pos4 - input[i].length : pos4;
    if (input[i][pos4] === "#") {
      trees4 += 1;
    }
  }
}

const res =
  treesArray[0] * treesArray[1] * treesArray[2] * treesArray[3] * trees4;

console.log(`Part 2: ${res}`);
