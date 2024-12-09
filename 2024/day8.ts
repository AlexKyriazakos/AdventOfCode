import { PathOrFileDescriptor, readFileSync } from "fs";

const parseInput = (inputPath: PathOrFileDescriptor) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((line) => line.split(""));

  return data;
};

function generateCombinations(
  arr: [number, number][],
  combinationLength: number
) {
  const result: [number, number][][] = [];

  // Helper function to generate combinations
  function backtrack(start: number, currentCombo: [number, number][]) {
    // If we've reached the desired combination length, add it to results
    if (currentCombo.length === combinationLength) {
      result.push([...currentCombo]);
      return;
    }

    // Iterate through the array starting from the given index
    for (let i = start; i < arr.length; i++) {
      // Add current element to combination
      currentCombo.push(arr[i]);

      // Recursively generate combinations
      backtrack(i + 1, currentCombo);

      // Backtrack by removing the last element
      currentCombo.pop();
    }
  }

  // Start the combination generation
  backtrack(0, []);

  return result;
}

const isPointValid = (
  [x, y]: [number, number],
  width: number,
  height: number
) => {
  return x >= 0 && x <= height && y >= 0 && y <= width;
};

const calc = (
  firstPoint: [number, number],
  secondPoint: [number, number],
  arr: string[][]
) => {
  const width = arr[0].length - 1;
  const height = arr.length - 1;
  let result: [number, number][] = [];

  const yDiff = secondPoint[1] - firstPoint[1];
  const xDiff = secondPoint[0] - firstPoint[0];

  const xPointA = firstPoint[0] - xDiff;
  const yPointA = firstPoint[1] - yDiff;

  if (isPointValid([xPointA, yPointA], width, height)) {
    result.push([xPointA, yPointA]);
  }

  const xPointB = secondPoint[0] + xDiff;
  const yPointB = secondPoint[1] + yDiff;

  if (isPointValid([xPointB, yPointB], width, height)) {
    result.push([xPointB, yPointB]);
  }

  return result;
};

const calc2 = (
  firstPoint: [number, number],
  secondPoint: [number, number],
  arr: string[][]
) => {
  const width = arr[0].length - 1;
  const height = arr.length - 1;

  const yDiff = secondPoint[1] - firstPoint[1];
  const xDiff = secondPoint[0] - firstPoint[0];

  const slope = yDiff / xDiff;

  const b = firstPoint[1] - slope * firstPoint[0];

  const result: [number, number][] = Array(arr.length)
    .fill(0)
    .map((_, i) => {
      const value = slope * i + b;

      if (Math.abs(value) < Number.EPSILON * 100) return [i, 0];

      return [i, value] as [number, number];
    });

  return result.filter(([_, y]) => Number.isInteger(y) && y <= width && y >= 0);
};

const calc3 = (
  point1: [number, number],
  point2: [number, number],
  arr: string[][]
) => {
  const [x1, y1] = point1;
  const [x2, y2] = point2;

  let result: [number, number][] = [];

  const lineEquation = (x: number, y: number) =>
    (y1 - y2) * x + (x2 - x1) * y + (x1 - x2) * y1 + (y2 - y1) * x1;

  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[0].length; y++) {
      const lineResult = lineEquation(x, y);
      if (lineResult === 0) result.push([x, y]);
    }
  }
  return result;
};

function solve(inputPath: string) {
  const data = parseInput(inputPath);

  let antennas: Record<string, [number, number][]> = {};

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== ".") {
        const frequency = data[x][y];
        const point: [number, number] = [x, y];
        antennas[frequency] = antennas[frequency] ?? [];
        antennas[frequency].push(point);
      }
    }
  }

  const uniqueAntinodes = new Set();
  for (const frequency in antennas) {
    const frequencyPoints = antennas[frequency];

    if (frequencyPoints.length <= 1) continue;

    const pointCombinations = generateCombinations(frequencyPoints, 2);

    for (const [firstPoint, secondPoint] of pointCombinations) {
      const antinodes = calc(firstPoint, secondPoint, data);

      for (const [x, y] of antinodes) {
        uniqueAntinodes.add(`${x}|${y}`);
      }
    }
  }
  return uniqueAntinodes.size;
}

function solveTwo(inputPath: string) {
  const data = parseInput(inputPath);

  let antennas: Record<string, [number, number][]> = {};

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== ".") {
        const frequency = data[x][y];
        const point: [number, number] = [x, y];
        antennas[frequency] = antennas[frequency] ?? [];
        antennas[frequency].push(point);
      }
    }
  }

  const uniqueAntinodes = new Set();
  for (const frequency in antennas) {
    const frequencyPoints = antennas[frequency];

    if (frequencyPoints.length <= 1) continue;

    const pointCombinations = generateCombinations(frequencyPoints, 2);

    for (const [firstPoint, secondPoint] of pointCombinations) {
      const antinodes = calc3(firstPoint, secondPoint, data);
      for (const [x, y] of antinodes) {
        uniqueAntinodes.add(`${x}|${y}`);
      }
    }
  }

  return uniqueAntinodes.size;
}

const demoResult = solve("day8-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day8-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day8-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day8-input.txt");
console.log("Part 2 result:", inputResult2);
