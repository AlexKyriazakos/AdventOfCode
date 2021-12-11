const fs = require("fs");

const inputStr = fs.readFileSync("input9.txt", { encoding: "utf-8" }).trim();

// const inputStr = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`;

const data = inputStr.split(/\s+/).map((l) => l.split("").map(Number));

const width = data[0].length - 1;
const height = data.length - 1;

const diff = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

const checkNeighbours = (x, y, arr) => {
  for (let i = 0; i < diff.length; i++) {
    const newX = x + diff[i][0];
    const newY = y + diff[i][1];

    if (newX < 0 || newX > height || newY < 0 || newY > width) continue;
    if (arr[x][y] >= arr[newX][newY]) return false;
  }
  return true;
};

const lowestPoints = [];

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    if (checkNeighbours(i, j, data)) {
      lowestPoints.push({ i, j, value: data[i][j] });
    }
  }
}

const riskLevels = lowestPoints.reduce((s, o) => (s += o.value + 1), 0);

console.log(riskLevels);

const basins = [];
let visitedPoints = new Set();
for (const point of lowestPoints) {
  checkBasinSize(point.i, point.j);
  basins.push(visitedPoints.size);
  visitedPoints = new Set();
}

console.log(
  basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((s, v) => (s *= v), 1)
);

function checkBasinSize(x, y) {
  const point = x + "|" + y;
  visitedPoints.add(point);

  const newPoints = [];
  for (let i = 0; i < diff.length; i++) {
    const newX = x + diff[i][0];
    const newY = y + diff[i][1];

    if (newX < 0 || newX > height || newY < 0 || newY > width) continue;
    const point = newX + "|" + newY;
    const value = data[newX][newY];
    if (value !== 9 && !visitedPoints.has(point)) {
      newPoints.push(point);
    }
  }

  if (newPoints.length)
    newPoints.forEach((p) => {
      const [x, y] = p.split("|").map(Number);
      checkBasinSize(x, y);
    });
}
