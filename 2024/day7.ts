import { readFileSync } from "fs";
import { EOL } from "os";
import { clearLine, cursorTo } from "readline";

const parseInput = (inputPath) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data: [number, number[]][] = input.split(/\r?\n/).map((line) => {
    const [result, parts] = line.split(":");

    const value = Number(result);
    const operands = parts.trim().split(" ").map(Number);

    return [value, operands];
  });

  return data;
};

const PERMUTATIONS_CACHE: Record<number, string[][]> = {};

function operatorPermutations(arr: string[], length: number) {
  const cacheKey = arr.join("") + length;
  if (PERMUTATIONS_CACHE[cacheKey]) return PERMUTATIONS_CACHE[cacheKey];

  if (length === 1) {
    PERMUTATIONS_CACHE[cacheKey] = arr.map((x) => [x]);
    return arr.map((x) => [x]);
  }

  const result: string[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];

    const subPerms = operatorPermutations(arr, length - 1);

    for (let subPerm of subPerms) {
      result.push([current, ...subPerm]);
    }
  }

  PERMUTATIONS_CACHE[cacheKey] = result;
  return result;
}

function calculateResult(operands: number[], operators: string[]) {
  let result = operands[0];
  for (let i = 1; i < operands.length; i++) {
    switch (operators[i - 1]) {
      case "*":
        result = result * operands[i];
        break;
      case "+":
        result = result + operands[i];
        break;
      case "||":
        result = Number(`${result}${operands[i]}`);
        break;
    }
  }
  return result;
}

function solve(inputPath) {
  const data = parseInput(inputPath);

  let validEquationsSum = 0;
  for (const [result, parts] of data) {
    const permutations = operatorPermutations(["*", "+"], parts.length - 1);

    for (const permutation of permutations) {
      const permResult = calculateResult(parts, permutation);

      if (result === permResult) {
        validEquationsSum += permResult;
        break;
      }
    }
  }

  //   console.log(data[0]);
  return validEquationsSum;
}

function solveTwo(inputPath) {
  const data = parseInput(inputPath);

  let validEquationsSum = 0;
  for (const [result, parts] of data) {
    const permutations = operatorPermutations(
      ["*", "+", "||"],
      parts.length - 1
    );

    for (const permutation of permutations) {
      const permResult = calculateResult(parts, permutation);

      if (result === permResult) {
        validEquationsSum += permResult;
        break;
      }
    }
  }

  //   console.log(data[0]);
  return validEquationsSum;
}

const demoResult = solve("day7-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day7-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day7-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day7-input.txt");
console.log("Part 2 result:", inputResult2);
