import { PathOrFileDescriptor, readFileSync } from "fs";

const parseInput = (inputPath: PathOrFileDescriptor) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((line) => line.split(""));

  return data;
};

const diffs = {
  N: [-1, 0],
  NE: [-1, 1],
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
  NW: [-1, -1],
} as const satisfies Record<string, [number, number]>;

const checkForXmas = (
  x: number,
  y: number,
  arr: string[][],
  direction: keyof typeof diffs
) => {
  const width = arr[0].length - 1;
  const height = arr.length - 1;

  let newX = x;
  let newY = y;

  let currentWord = "X";
  while ("XMAS".startsWith(currentWord)) {
    const diff = diffs[direction];

    newX += diff[0];
    newY += diff[1];

    if (newX < 0 || newX > height || newY < 0 || newY > width) return false;
    currentWord += arr[newX][newY];

    if (currentWord === "XMAS") return true;
  }
  return false;
};

const checkForCrossmas = (x: number, y: number, arr: string[][]) => {
  const diagonal1 = [diffs["NE"], diffs["SW"]];
  const diagonal2 = [diffs["SE"], diffs["NW"]];

  let diff: [number, number] = diagonal1[0];
  let newX = x + diff[0];
  let newY = y + diff[1];

  let word = arr[newX]?.[newY] + "A";

  diff = diagonal1[1];

  newX = x + diff[0];
  newY = y + diff[1];
  word += arr[newX]?.[newY];

  if (!["SAM", "MAS"].includes(word)) return false;

  diff = diagonal2[0];
  newX = x + diff[0];
  newY = y + diff[1];

  word = arr[newX]?.[newY] + "A";

  diff = diagonal2[1];

  newX = x + diff[0];
  newY = y + diff[1];
  word += arr[newX]?.[newY];

  if (!["SAM", "MAS"].includes(word)) return false;

  return true;
};

const checkAllDirections = (x: number, y: number, arr: string[][]) => {
  let xmasCount = 0;
  let direction: keyof typeof diffs;
  for (direction in diffs) {
    if (checkForXmas(x, y, arr, direction)) {
      xmasCount += 1;
    }
  }

  return xmasCount;
};

function solve(inputPath: PathOrFileDescriptor) {
  const data = parseInput(inputPath);

  let totalXmasCount = 0;
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] === "X") {
        totalXmasCount += checkAllDirections(x, y, data);
      }
    }
  }

  return totalXmasCount;
}

function solveTwo(inputPath: PathOrFileDescriptor) {
  const data = parseInput(inputPath);

  let totalXmasCount = 0;
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] === "A") {
        if (checkForCrossmas(x, y, data)) totalXmasCount += 1;
      }
    }
  }

  return totalXmasCount;
}

const demoResult = solve("day4-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day4-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day4-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day4-input.txt");
console.log("Part 2 result:", inputResult2);
