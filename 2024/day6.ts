import { Dir, PathOrFileDescriptor, readFileSync } from "fs";
import { performance } from "node:perf_hooks";
import { EOL } from "os";
import { clearLine, cursorTo } from "readline";

const parseInput = (inputPath: PathOrFileDescriptor) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((line) => line.split(""));

  return data;
};

// ANSI color codes
const COLORS = {
  RED: "\x1b[91m",
  GREEN: "\x1b[92m",
  CYAN: "\x1b[36m",
  RESET: "\x1b[0m",
};

const diffs = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
} as const satisfies Record<string, [number, number]>;

type Direction = keyof typeof diffs;

const rightTurnDirs = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
} satisfies { [K in Direction]: Direction };

const walkGuard = (
  x: number,
  y: number,
  arr: string[][],
  direction: Direction
): [number, number, Direction] | null => {
  const width = arr[0].length - 1;
  const height = arr.length - 1;

  let newX = x;
  let newY = y;

  const diff = diffs[direction];

  newX += diff[0];
  newY += diff[1];

  if (newX < 0 || newX > height || newY < 0 || newY > width) return null;

  if (arr[newX][newY] === "#") {
    return [x, y, rightTurnDirs[direction]];
  }

  return [newX, newY, direction];
};
const sleep = async () => {
  return new Promise((r) => {
    setTimeout(r, 50);
  });
};

const printCell = (cell: string) => {
  switch (cell) {
    case "#":
      return `${COLORS.CYAN}#${COLORS.RESET}`;
    case "^":
    case ">":
    case "v":
    case "<":
      return `${COLORS.GREEN}${cell}${COLORS.RESET}`;
    case "X":
      return `${COLORS.RED}#${COLORS.RESET}`;
    default:
      return cell;
  }
};
const countSteps = async (x: number, y: number, arr: string[][]) => {
  let direction: Direction = "N";
  const visited = new Set([`${x}|${y}`]);

  const uniqueSteps = new Set([`${x}|${y}-${direction}`]);
  let steps = 5;
  console.clear();
  console.log(
    arr.map((row) => row.map((cell) => printCell(cell)).join("")).join(EOL)
  );

  cursorTo(process.stdout, 0, 0);
  while (steps > 0) {
    cursorTo(process.stdout, 0, 0);
    await sleep();

    // arr.forEach((row) => {
    //   // Clear the entire line before printing
    //   clearLine(process.stdout, 0);
    //   console.log(row.join(""));
    // });

    // console.log(uniqueSteps.size);
    // await sleep();
    const result = walkGuard(x, y, arr, direction);

    arr[x][y] = `${COLORS.RED}X${COLORS.RESET}`;
    // If result is null guard is out of the map

    cursorTo(process.stdout, 0, x);
    clearLine(process.stdout, 0);
    console.log(arr[x].map(printCell).join(""));

    // return;

    if (!result) {
      console.clear();
      console.log(
        arr.map((row) => row.map((cell) => printCell(cell)).join("")).join(EOL)
      );
      console.log(uniqueSteps.size);
      break;
    }

    const guardIcon = {
      N: "^",
      E: ">",
      S: "v",
      W: "<",
    };

    [x, y, direction] = result;

    arr[x][y] = guardIcon[direction];
    cursorTo(process.stdout, 0, x);
    clearLine(process.stdout, 0);
    console.log(arr[x].map(printCell).join(""));

    const uniqueKey = `${x}|${y}-${direction}`;
    // If key exists in the set then we're looping
    if (uniqueSteps.has(uniqueKey)) {
      return { loop: true, visited };
    }
    uniqueSteps.add(uniqueKey);
    visited.add(`${x}|${y}`);
  }

  return { loop: false, visited };
};

async function solve(inputPath: string) {
  const data = parseInput(inputPath);

  const x = data.findIndex((x) => x.includes("^"));
  const y = data[x].indexOf("^");
  const result = await countSteps(x, y, data);

  //   return result.visited.size;
}

async function solveTwo(inputPath: any) {
  const data = parseInput(inputPath);

  const x = data.findIndex((x) => x.includes("^"));
  const y = data[x].indexOf("^");
  const result = await countSteps(x, y, data);

  const initialPath = [...result.visited].map((step) =>
    step.split("|").map(Number)
  );

  const obstaclePositions = new Set();

  for (let i = 1; i < initialPath.length; i++) {
    const [obsX, obsY] = initialPath[i];
    const newMap = JSON.parse(JSON.stringify(data));

    newMap[obsX][obsY] = "#";

    const result = await countSteps(x, y, newMap);

    if (result.loop) obstaclePositions.add(`${obsX}|${obsY}`);
  }

  return obstaclePositions.size;
}

// const demoResult = solve("day6-demo-input.txt");
// console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day6-input.txt");
// console.log("Part 1 result:", inputResult);

// const demoResult2 = solveTwo("day6-demo-input.txt");
// console.log("Part 2 demo input result:", demoResult2);

// var t0 = performance.now();
// const inputResult2 = solveTwo("day6-input.txt");
// console.log("Part 2 result:", inputResult2);
// var t1 = performance.now();
// console.log("Part 2 took " + (t1 - t0) + " milliseconds.");
