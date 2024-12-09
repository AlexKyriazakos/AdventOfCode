import { PathOrFileDescriptor, readFileSync } from "fs";

const parseInput = (inputPath: PathOrFileDescriptor) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const [rules, updates] = input
    .split(/\r?\n\r?\n/)
    .map((part) => part.split(/\r?\n/));

  return [
    rules.map((rule) => rule.split("|").map(Number)),
    updates.map((update) => update.split(",").map(Number)),
  ];
};

function solve(inputPath: string) {
  const [rules, updates] = parseInput(inputPath);

  let middlePageSum = 0;
  for (let update of updates) {
    const isUpdateError = update.some((page, index) => {
      const isError = rules.some(
        (r) => r[1] === page && update.slice(index + 1).includes(r[0])
      );

      return isError;
    });

    if (!isUpdateError) middlePageSum += update[Math.floor(update.length / 2)];
  }

  return middlePageSum;
}

function solveTwo(inputPath: string) {
  const [rules, updates] = parseInput(inputPath);

  let correctedMiddlePageSum = 0;
  for (let update of updates) {
    const isUpdateError = update.some((page, index) => {
      const isError = rules.some(
        (r) => r[1] === page && update.slice(index + 1).includes(r[0])
      );

      return isError;
    });

    if (isUpdateError) {
      update.sort((a, b) => {
        const rule = rules.find((r) =>
          [`${a}|${b}`, `${b}|${a}`].includes(`${r[0]}|${r[1]}`)
        )!;

        if (rule) return rule.indexOf(a) - rule.indexOf(b);
        return 0;
      });

      correctedMiddlePageSum += update[Math.floor(update.length / 2)];
    }
  }
  return correctedMiddlePageSum;
}

const demoResult = solve("day5-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day5-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day5-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day5-input.txt");
console.log("Part 2 result:", inputResult2);
