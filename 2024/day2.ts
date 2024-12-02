import { readFileSync } from "fs";

const parseInput = (inputPath) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).reduce((result, line) => {
    const numbers = line.split(/\s+/).map(Number);

    return [...result, numbers];
  }, [] as number[][]);

  return data;
};

const parseReport = (report: number[]) => {
  const isIncreasing = report[0] < report[1];

  for (let i = 1; i < report.length; i++) {
    const currentValue = report[i];
    const prevValue = report[i - 1];
    const absDiff = Math.abs(currentValue - prevValue);

    const isOrderCorrect = isIncreasing
      ? currentValue > prevValue
      : currentValue < prevValue;
    const isDiffCorrect = absDiff >= 1 && absDiff <= 3;

    if (!isOrderCorrect || !isDiffCorrect) {
      return false;
    }
  }
  return true;
};

function solve(inputPath) {
  const data = parseInput(inputPath);

  const reportResults: boolean[] = [];

  for (const report of data) {
    const safe = parseReport(report);
    reportResults.push(safe);
  }
  const sum = reportResults.filter(Boolean).length;

  return sum;
}

function solveTwo(inputPath) {
  const data = parseInput(inputPath);

  const reportResults: boolean[] = [];

  for (const report of data) {
    let safe = parseReport(report);

    if (!safe) {
      for (let j = 0; j < report.length; j++) {
        const newReport = [...report];
        newReport.splice(j, 1);
        safe = parseReport(newReport);

        if (safe) break;
      }
    }
    reportResults.push(safe);
  }
  const sum = reportResults.filter(Boolean).length;

  return sum;
}

const demoResult = solve("day2-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day2-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day2-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day2-input.txt");
console.log("Part 2 result:", inputResult2);
