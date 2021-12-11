const fs = require("fs");
const input = fs
  .readFileSync("input9.txt", "utf-8")
  .split("\r\n")
  .map((el) => parseInt(el));

const sortInt = (arr) => arr.sort((a, b) => a - b);

loop1: for (let i = 25; i < input.length; i++) {
  const preamble = sortInt(input.slice(i - 25, i));

  const maxNum = preamble[24] * 2;
  const minNum = preamble[0] + preamble[1];

  if (input[i] >= maxNum || input[i] < minNum) {
    console.log(`Part 1: INVALID NUMBER ${input[i]}`);
    break;
  }

  for (let j = 0; j < preamble.length; j++) {
    const num = preamble[j];
    const complement = input[i] - num;

    if (preamble.indexOf(complement) > -1) {
      continue loop1;
    }
  }
  console.log("NO PAIR", i, input[i], preamble);
  break;
}

let outerIterator = 0;
let innerIterator = 0;
let acc = 0;
const val = 15690279;

while (true) {
  const num = input[innerIterator];
  acc += num;

  if (acc === val) break;
  if (acc < val) innerIterator += 1;
  if (acc > val) {
    outerIterator += 1;
    innerIterator = outerIterator;
    acc = 0;
  }
}
const arr = sortInt(input.slice(outerIterator, innerIterator + 1));

console.log(`Part 2: Sum is ${arr[0] + arr[arr.length - 1]}`);
