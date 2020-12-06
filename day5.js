const fs = require("fs");
const input = fs.readFileSync("input5.txt", "utf-8").split("\r\n");

const newRange = (min, max, value) => {
  return value === "F" || value === "L"
    ? [min, min + Math.floor((max - min) / 2)]
    : [min + Math.ceil((max - min) / 2), max];
};

const getRow = (value) => {
  let min = 0;
  let max = 127;
  for (let i = 0; i < value.length; i++) {
    [min, max] = newRange(min, max, value[i]);
  }
  return min === max ? min : undefined;
};

const getColumn = (value) => {
  let min = 0;
  let max = 7;
  for (let i = 0; i < value.length; i++) {
    [min, max] = newRange(min, max, value[i]);
  }
  return min === max ? min : undefined;
};

const decodedInput = input.map(
  (el) => getRow(el.slice(0, -3)) * 8 + getColumn(el.slice(-3))
);

console.log(`Part 1: Highest seat ID is ${Math.max(...decodedInput)}`);

decodedInput.sort((a, b) => Number(a) - Number(b));

for (let i = 1; i < decodedInput.length; i++) {
  if (decodedInput[i] - decodedInput[i - 1] != 1) {
    console.log(`Part 2: Seat is ${decodedInput[i] - 1}`);
  }
}
