const fs = require("fs");
const input = fs.readFileSync("input14.txt", "utf-8").split("\r\n");

function applyMask(mask, value) {
  const onesMask = BigInt(parseInt(mask.replace(/X/g, "0"), 2));
  const zerosMask = BigInt(parseInt(mask.replace(/X/g, "1"), 2));

  const result = (value & zerosMask) | onesMask;

  return result;
}

let currentMask;
const memory = {};

for (let i = 0; i < input.length; i++) {
  let [cmd, value] = input[i].split(" = ");
  let address;
  switch (cmd.slice(0, 3)) {
    case "mas": {
      currentMask = value;
      break;
    }
    case "mem": {
      address = BigInt(parseInt(cmd.match(/\d+/g)[0]));
      value = BigInt(parseInt(value));
      memory[address] = applyMask(currentMask, value);
      break;
    }
  }
}

console.log(Object.values(memory).reduce((sum, cv) => (sum += cv), BigInt(0)));

const masks = input.filter((line) => line.slice(0, 3) === "mas");

const bits = Array.from("001011");

const mask = masks[0].split(" = ")[1];

const newMask = [...mask]
  .map((char) => (char === "X" ? bits.shift() : char))
  .join("");

console.log(mask);
console.log(newMask);

function createBinaryNumbers(length) {}
