const fs = require("fs");
const path = require("path");

// const inputPath = path.join(__dirname, "..", "demo_input1.txt");
const inputPath = path.join(__dirname, "..", "input1.txt");

const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

const data = input
  .split(/\r?\n\r?\n/)
  .map((elf) =>
    elf.split(/\r?\n/).reduce((sum, current) => (sum += Number(current)), 0)
  )
  .sort((a, b) => a - b)
  .reverse();

const richElf = data[0];

// Part two

const topThreeSum = data.slice(0, 3).reduce((s, v) => (s += v), 0);

console.log(richElf, topThreeSum);
