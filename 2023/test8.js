const fs = require("fs");

const demoInput = `30373
25512
65332
33549
35390`;

const input = fs.readFileSync("test8.txt", { encoding: "utf-8" }).trim();

const data = input
  .split(/\r?\n/)
  .map((row) => row.split("").map((v) => Number(v)));

let visibleTrees = 2 * (data.length + data[0].length) - 4;
let highScenicScore = 0;

let randPrints = 0;

for (let x = 1; x < data.length - 1; x++) {
  for (let y = 1; y < data[0].length - 1; y++) {
    // console.log(data[x][y]);

    const res = checkVisibility(x, y, data);

    const res2 = countVisibility(x, y, data);

    if (randPrints < 20 && Math.random() < 0.3) {
      console.log(x, y, res, res2);
      randPrints++;
    }

    if (res) visibleTrees += 1;
    if (res2 > highScenicScore) highScenicScore = res2;
  }
}

console.log({ visibleTrees, highScenicScore });

function checkVisibility(x, y, arr) {
  const height = arr[x][y];
  let visible = false;

  // Check North
  for (let i = x - 1; i >= 0; i--) {
    //   console.log(x, y, height, arr[i][y]);
    visible = arr[i][y] < height;
    if (!visible) break;
  }
  if (visible) return true;

  // Check South
  for (let i = x + 1; i < data.length; i++) {
    //   console.log(x, y, height, arr[i][y]);
    visible = arr[i][y] < height;
    if (!visible) break;
  }
  if (visible) return true;

  // Check West
  for (let i = y - 1; i >= 0; i--) {
    visible = arr[x][i] < height;
    if (!visible) break;
  }
  if (visible) return true;

  // Check East
  for (let i = y + 1; i < arr[0].length; i++) {
    visible = arr[x][i] < height;
    if (!visible) break;
  }
  if (visible) return true;

  return visible;
}

function countVisibility(x, y, arr) {
  const height = arr[x][y];
  let score = [];
  let visibility = 0;

  // Check North
  for (let i = x - 1; i >= 0; i--) {
    //   console.log(x, y, height, arr[i][y]);
    visibility++;
    if (arr[i][y] >= height) break;
  }
  score.push(visibility);
  visibility = 0;

  // Check South
  for (let i = x + 1; i < data.length; i++) {
    //   console.log(x, y, height, arr[i][y]);
    visibility++;
    if (arr[i][y] >= height) break;
  }
  score.push(visibility);
  visibility = 0;

  // Check West
  for (let i = y - 1; i >= 0; i--) {
    visibility++;
    if (arr[x][i] >= height) break;
  }
  score.push(visibility);
  visibility = 0;

  // Check East
  for (let i = y + 1; i < arr[0].length; i++) {
    visibility++;
    if (arr[x][i] >= height) break;
  }
  score.push(visibility);

  return score.reduce((p, v) => (p *= v), 1);
}
