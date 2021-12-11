const fs = require("fs");
const input = fs
  .readFileSync("input17t.txt", "utf-8")
  .split("\r\n")
  .map((row) => row.split(""));

function countNeighbors(x, y, z, map) {
  let count = 0;
  for (let k = z - 1; k < z + 1; k++) {
    for (let i = x - 1; i < x + 1; i++) {
      for (let j = y - 1; j < y + 1; j++) {
        if (x !== i || y !== j || z !== k) {
          if (map[`${i},${j},${k}`]) count += 1;
        }
      }
    }
  }
  return count;
}

let points = {};
input.map((row, X) => {
  row.map((cell, Y) => {
    if (cell === "#") {
      const vec = `${X},${Y},0`;
      points[vec] = true;
    }
  });
});

let gridX = [0, input[0].length];
let gridY = [0, input.length];
let gridZ = [0, 1];

for (let cycle = 0; cycle < 1; cycle++) {
  let newPoints = {};
  gridX[0]--;
  gridY[0]--;
  gridZ[0]--;
  gridX[1]++;
  gridY[1]++;
  gridZ[1]++;

  for (let z = gridZ[0]; z < gridZ[1]; z++) {
    for (let x = gridX[0]; x < gridX[1]; x++) {
      for (let y = gridY[0]; y < gridY[1]; y++) {
        let neighbors = countNeighbors(x, y, z, points);
        if (points[`${x},${y},${z}`]) {
          newPoints[`${x},${y},${z}`] =
            neighbors === 2 || neighbors === 3 ? true : false;
        } else {
          newPoints[`${x},${y},${z}`] = neighbors === 3 ? true : false;
        }
      }
    }
  }
  points = newPoints;
}

console.log(Object.values(points).filter(Boolean));
