import { readFileSync } from "fs";

const parseInput = (inputPath) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  return input;
};

const parseInstructions = (input: string) => {
  const RE = /mul\((\d+)\,(\d+)\)/gm;

  let match;

  let result: { instr: string; value: number }[] = [];
  while ((match = RE.exec(input)) !== null) {
    result.push({
      instr: match[0],
      value: Number(match[1]) * Number(match[2]),
    });
  }

  const sum = result.reduce((s, v) => (s += v.value), 0);

  return sum;
};

function solve(inputPath) {
  const data = parseInput(inputPath);

  return parseInstructions(data);
}

function solveTwo(inputPath) {
  const data = parseInput(inputPath);

  const RE = /(?:don't\(\))|(?:do\(\))/g;

  let sum = 0;

  let lastIndex = 0;
  let lastCommand = "do()";
  let match;
  while ((match = RE.exec(data)) !== null) {
    if (lastCommand === "do()") {
      const prevSection = data.slice(lastIndex, match.index);
      sum += parseInstructions(prevSection);
    }

    lastCommand = match[0];
    lastIndex = match.index;
  }

  return sum;
}

const inputResult = solve("day3-input.txt");
console.log("Part 1 result:", inputResult);

const inputResult2 = solveTwo("day3-input.txt");
console.log("Part 2 result:", inputResult2);
