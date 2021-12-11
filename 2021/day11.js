const fs = require("fs");

const inputStr = fs.readFileSync("input11.txt", { encoding: "utf-8" }).trim();

// const inputStr = `11111
// 19991
// 19191
// 19991
// 11111`;

// const inputStr = `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`;

const data = inputStr.split(/\s+/).map((l) => l.split("").map(Number));

const width = data[0].length - 1;
const height = data.length - 1;

const diff = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const flashOctopus = (x, y, arr) => {
  flashCounter += 1;
  for (let i = 0; i < diff.length; i++) {
    const newX = x + diff[i][0];
    const newY = y + diff[i][1];
    const key = `${newX}${newY}`;

    if (
      newX < 0 ||
      newX > height ||
      newY < 0 ||
      newY > width ||
      flashed.has(key)
    )
      continue;
    arr[newX][newY] += 1;
    if (arr[newX][newY] > 9) toFlash.add(key);
  }
  return arr;
};

const printGrid = (arr) =>
  arr
    .map((l) =>
      l.map((v) => (v === 0 ? "\x1b[36m" + v + "\x1b[0m" : v)).join("")
    )
    .join("\n");

const steps = 2000;

let flashCounter = 0;
let toFlash = new Set();
let flashed = new Set();
let stepState = data.map((r) => r.map((e) => e));
for (let i = 0; i < steps; i++) {
  flashed = new Set();
  // Increase energy by one
  let newState = stepState.map((l) => l.map((e) => (e += 1)));
  newState.forEach((l, x) => {
    l.forEach((o, y) => {
      if (o > 9) toFlash.add(`${x}${y}`);
    });
  });
  while (toFlash.size > 0) {
    const [key] = toFlash;
    const [x, y] = key.split("").map(Number);

    newState = flashOctopus(x, y, newState);

    flashed.add(key);
    toFlash.delete(key);
  }
  stepState = newState.map((l) => l.map((e) => (e > 9 ? 0 : e)));

  if (flashed.size === 100) {
    console.log("Everyone flashed in step", i + 1);
    return;
  }
  //   console.log(`STEP ${i + 1} Flashes: ${flashCounter}`);
  //   console.log(printGrid(stepState));
  //   console.log("==========");
}

console.log(flashCounter);
