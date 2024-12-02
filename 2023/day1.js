const fs = require("fs");
const path = require("path");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((value) => {
    const result = value
      .split("")
      .map(Number)
      .filter((v) => !Number.isNaN(v));

    const finalValue = Number(`${result[0]}${result[result.length - 1]}`);

    return finalValue;
  });

  const sum = data.reduce((s, v) => (s += v), 0);

  return sum;
}

function solveTwo(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();
  //   const input = `two1nine
  //   eightwothree
  //   abcone2threexyz
  //   xtwone3four
  //   4nineeightseven2
  //   zoneight234
  //   7pqrstsixteen
  //   oneight`;
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numberMap = numbers.reduce((obj, c, i) => {
    obj[c] = i + 1;
    return obj;
  }, {});
  const RE = new RegExp(`(?=(${numbers.join("|")}|\\d)+?)`, "g");

  const data = input.split(/\r?\n/).map((value, i) => {
    const matches = [...value.matchAll(RE)];
    const firstExtractedDigit = matches[0][1];
    const secondExtractedDigit = matches[matches.length - 1][1];

    const firstDigit = numberMap[firstExtractedDigit] ?? firstExtractedDigit;
    const secondDigit = numberMap[secondExtractedDigit] ?? secondExtractedDigit;
    if (i < 50) console.log(value, Number(`${firstDigit}${secondDigit}`));
    return Number(`${firstDigit}${secondDigit}`);
  });

  const sum = data.reduce((s, v) => (s += v), 0);

  return sum;
}

const demoResult = solve("day1-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day1-input.txt");
console.log("Part 1 result:", inputResult);

const inputResult2 = solveTwo("day1-input.txt");
console.log("Part 2 result:", inputResult2);
