const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input13.txt", { encoding: "utf-8" })
  .trim();

// const inputStr = `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`;

const [input1, input2] = inputStr
  .split(/\r\n\r\n/)
  .map((part) => part.split("\r\n"));

const printGrid = (arr) =>
  arr
    .map((l) => l.map((v) => (v === 1 ? "\x1b[36m#\x1b[0m" : ".")).join(""))
    .join("\n");

console.log(input1, input2);

const points = input1.map((str) => {
  const [x, y] = str.match(/\d+/g).map(Number);
  return { x, y };
});

const folds = input2.map((str) => {
  const [direction, line] = str.replace("fold along ", "").split("=");
  return { direction, line: Number(line) };
});

const maxX = Math.max(...points.map((p) => p.x));
const maxY = Math.max(...points.map((p) => p.y));

let grid = [];
for (let i = 0; i <= maxY; i++) {
  grid[i] = new Array();
  for (j = 0; j <= maxX; j++) {
    grid[i][j] = 0;
  }
}

points.forEach((p) => (grid[p.y][p.x] = 1));

const res1 = fold(grid, folds[0].direction, folds[0].line).reduce(
  (s, v) => (s += v.reduce((innerS, v) => (innerS += v), 0)),
  0
);
console.log(res1);
folds.forEach(({ direction, line }) => {
  grid = fold(grid, direction, line);
});
console.log(printGrid(grid));

function fold(grid, direction, line) {
  let half1, half2;
  if (direction === "y") {
    half1 = grid.slice(0, line);
    half2 = grid.slice(line + 1).reverse();
  } else {
    half1 = grid.map((r) => r.slice(0, line));
    half2 = grid.map((r) => r.slice(line + 1).reverse());
  }
  return mergeArrays(half1, half2);
}

function mergeArrays(arr1, arr2) {
  const result = new Array(arr1.length);
  for (let i = 0; i < arr1.length; i++) {
    result[i] = Array.isArray(arr2[i])
      ? mergeArrays(arr1[i], arr2[i])
      : arr1[i] || arr2[i];
  }
  return result;
}
