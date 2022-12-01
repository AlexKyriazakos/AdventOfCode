const fs = require("fs");

// const inputStr = fs
//   .readFileSync(__dirname + "/input18.txt", { encoding: "utf-8" })
//   .trim();

const inputStr = `[[[[[9,8],1],2],3],4]`;

const data = inputStr.split(/\s+/);

console.log(data);

function reducePair(pair) {}

data.forEach((line) => {
  let count = 0;
  console.log(line);
  let recordedPair = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === "[") count++;
    if (count >= 4) recordedPair.push(char);
    if (char === "]") count--;
  }
  console.log(recordedPair.join(""));
});
