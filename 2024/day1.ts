import fs from "fs";

// const numberSort = (a: string, b: string) => Number(a) - Number(b);

const parseInput = (inputPath) => {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).reduce(
    ([listA, listB], line) => {
      const [a, b] = line.split(/\s+/);

      return [[...listA, Number(a)].sort(), [...listB, Number(b)].sort()];
    },
    [[], []] as number[][]
  );

  return data;
};

function solve(inputPath) {
  const data = parseInput(inputPath);

  const [listA, listB] = data;

  const distances = listA.map((v, i) => Math.abs(v - listB[i]));

  const sum = distances.reduce((s, v) => (s += v), 0);

  return sum;
}

function solveTwo(inputPath) {
  const data = parseInput(inputPath);

  const [listA, listB] = data;

  const listBCounts = listB.reduce((acc, v) => {
    acc[v] = (acc[v] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const similarities = listA.map((v) => v * (listBCounts[v] ?? 0));
  const sum = similarities.reduce((s, v) => (s += v), 0);

  return sum;
}

const demoResult = solve("day1-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day1-input.txt");
console.log("Part 1 result:", inputResult);

const inputResult2 = solveTwo("day1-input.txt");
console.log("Part 2 result:", inputResult2);
