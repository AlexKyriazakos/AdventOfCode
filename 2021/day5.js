const fs = require("fs");

const input = fs.readFileSync("input5.txt", { encoding: "utf-8" }).trim();

// const input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`;

const data = input.split("\r\n");

let max = 0;

const allLines = data.map((str) => {
  const [startX, startY, endX, endY] = str.match(/\d+/g).map(Number);
  max = Math.max(startX, startY, endX, endY, max);
  return { startX, startY, endX, endY };
});

const straightLines = allLines.filter(
  ({ startX, startY, endX, endY }) => startX === endX || startY === endY
);

let grid = [];
for (let i = 0; i <= max; i++) {
  grid[i] = new Array();
  for (j = 0; j <= max; j++) {
    grid[i][j] = 0;
  }
}

straightLines.forEach((line) => {
  drawLine(line, grid);
});

const res1 = grid.reduce((s, x) => {
  s += x.reduce((innerS, y) => {
    if (y > 1) innerS += 1;
    return innerS;
  }, 0);
  return s;
}, 0);

console.log(res1);

for (let i = 0; i <= max; i++) {
  grid[i] = new Array();
  for (j = 0; j <= max; j++) {
    grid[i][j] = 0;
  }
}

allLines.forEach((line) => {
  drawLine(line, grid);
});

const res2 = grid.reduce((s, x) => {
  s += x.reduce((innerS, y) => {
    if (y > 1) innerS += 1;
    return innerS;
  }, 0);
  return s;
}, 0);

console.log(res2);

function drawLine(line, grid) {
  let { startX, startY, endX, endY } = { ...line };
  grid[startX][startY] += 1;

  while (!(startX === endX && startY === endY)) {
    if (startX < endX) {
      startX++;
    } else if (startX > endX) {
      startX--;
    }

    if (startY < endY) {
      startY++;
    } else if (startY > endY) {
      startY--;
    }

    grid[startX][startY] += 1;
  }
  return grid;
}
