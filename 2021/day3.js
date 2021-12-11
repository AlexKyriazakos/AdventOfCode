const fs = require("fs");

const input = fs.readFileSync("input3.txt", { encoding: "utf-8" }).trim();

const data = input.split("\r\n");

console.log(data.length);

const testInput = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
  .trim()
  .split("\n");

// console.log(testInput);

let gammaStr = "",
  epsilonStr = "";

for (let i = 0; i < data[0].length; i++) {
  let ones = 0,
    zeros = 0;
  for (let j = 0; j < data.length; j++) {
    if (data[j][i] == 0) zeros++;
    else ones++;
  }
  if (ones > zeros) {
    gammaStr += "1";
    epsilonStr += "0";
  } else {
    gammaStr += "0";
    epsilonStr += "1";
  }

  console.log(i, ones, zeros);
}

const gammaNum = parseInt(gammaStr, 2);
const epsilonNum = parseInt(epsilonStr, 2);

const res1 = gammaNum * epsilonNum;

console.log(gammaStr, gammaNum, epsilonStr, epsilonNum, res1);

let cleanData = data;

let bitPosition = 0;
while (cleanData.length > 1) {
  let ones = 0,
    zeros = 0;
  for (let i = 0; i < cleanData.length; i++) {
    if (cleanData[i][bitPosition] == 0) zeros++;
    else ones++;
  }
  if (ones >= zeros) {
    cleanData = cleanData.filter((v) => v[bitPosition] === "1");
  } else {
    cleanData = cleanData.filter((v) => v[bitPosition] === "0");
  }

  console.log(bitPosition, ones, zeros);

  bitPosition++;

  if (bitPosition >= cleanData[0].length) break;
}

const o2Num = parseInt(cleanData[0], 2);

cleanData = data;

bitPosition = 0;
while (cleanData.length > 1) {
  let ones = 0,
    zeros = 0;
  for (let i = 0; i < cleanData.length; i++) {
    if (cleanData[i][bitPosition] == 0) zeros++;
    else ones++;
  }
  if (zeros <= ones) {
    cleanData = cleanData.filter((v) => v[bitPosition] === "0");
  } else {
    cleanData = cleanData.filter((v) => v[bitPosition] === "1");
  }

  console.log(bitPosition, ones, zeros);

  bitPosition++;

  if (bitPosition >= cleanData[0].length) break;
}

const co2Num = parseInt(cleanData[0], 2);

const res2 = o2Num * co2Num;
console.log(o2Num, co2Num, res2);
