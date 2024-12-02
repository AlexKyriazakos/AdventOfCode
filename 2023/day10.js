const fs = require("fs");

function getNextPoints(x, y, map) {
  const point = map[x][y];
  switch (point) {
    case "|":
      return [`${x + 1},${y}`, `${x - 1},${y}`];
    case "-":
      return [`${x},${y + 1}`, `${x},${y - 1}`];
    case "L":
      return [`${x + 1},${y}`, `${x},${y + 1}`];
    case "J":
      return [`${x + 1},${y}`, `${x},${y - 1}`];
    case "7":
      return [`${x - 1},${y}`, `${x},${y - 1}`];
    case "F":
      return [`${x - 1},${y}`, `${x},${y + 1}`];
    default:
      return [];
  }
}

function toLoc() {
  //   console.log({ pointOrPoints: this, ty: typeof this });
  return this.valueOf()
    .split(",")
    .map((v) => Number(v));
}

String.prototype.toLoc = toLoc;

// function getNextPoints(x, y, map) {
//     const point = map[x][y];
//     switch (point) {
//       case "|":
//         return [[x + 1], [y], [x - 1], [y]];
//       case "-":
//         return [[x], [y + 1], [x], [y - 1]];
//       case "L":
//         return [[x + 1], [y], [x], [y + 1]];
//       case "J":
//         return [[x + 1], [y], [x], [y - 1]];
//       case "7":
//         return [[x - 1], [y], [x], [y - 1]];
//       case "F":
//         return [[x - 1], [y], [x], [y + 1]];
//     }
//   }

function parseStartPoint(x, y, map) {
  let result = [];
  const deltas = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  for (const [deltaX, deltaY] of deltas) {
    const newX = x + deltaX;
    const newY = y + deltaY;
    if (newX > map.length - 1 || newY > map[0].length - 1) continue;
    const nextPoints = getNextPoints(newX, newY, map);

    if (nextPoints.includes(`${x},${y}`)) result.push([newX, newY]);

    // console.log({ newPoint, nextPoints });
  }
  //   console.log({ result });
  return result;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  let startX, startY;
  // Try placing 0,0 at bottom left
  const data = input
    .split(/\r?\n/g)
    .reverse()
    .map((row, x) => {
      // Find starting location
      if (row.includes("S")) {
        startX = x;
        startY = row.indexOf("S");
      }
      return row.split("");
    });

  let pointsVisited = { [`${startX},${startY}`]: 1 };
  let [[fwX, fwY], [bwX, bwY]] = parseStartPoint(startX, startY, data);
  let step = 1;
  pointsVisited[`${fwX},${fwY}`] = step;
  pointsVisited[`${bwX},${bwY}`] = step;

  const vertices = [[startX, startY]];

  while (bwX !== fwX || bwY !== fwY) {
    step++;
    // Move forward
    const fwPoint = data[fwX][fwY];
    if (!["|", "-"].includes(fwPoint)) vertices.push([fwX, fwY]);
    const nextFw = getNextPoints(fwX, fwY, data);
    [fwX, fwY] = nextFw.find((point) => !pointsVisited[point]).toLoc();
    // console.log({ fwPoint });
    // console.log({ nextFw, fwX, fwY });

    // Move backward
    const bwPoint = data[bwX][bwY];
    if (!["|", "-"].includes(bwPoint)) vertices.push([bwX, bwY]);
    const nextBw = getNextPoints(bwX, bwY, data);
    [bwX, bwY] = nextBw.find((point) => !pointsVisited[point]).toLoc();
    // console.log({ bwPoint });
    // console.log({ nextBw, bwX, bwY });

    pointsVisited[`${fwX},${fwY}`] = step;
    pointsVisited[`${bwX},${bwY}`] = step;
  }

  // console.log(vertices);
  // console.log(pointsVisited);

  console.log(data[0][0]);

  let s1 = 0;
  let s2 = 0;

  for (let i = 1; i < vertices.length; i++) {
    const prev = vertices[i - 1];
    const current = vertices[i];

    s1 += prev[0] * current[1];
    s2 += prev[1] * current[0];
  }

  console.log({ s1, s2 });

  // Shoelace formula
  const innerArea = Math.abs(s1 - s2) / 2;

  console.log(innerArea);

  return [Math.max(...Object.values(pointsVisited))];
}

const demoResult = solve("day10-demo-input.txt");
console.log("Demo input result:", demoResult);

// const inputResult = solve("day10-input.txt");
// console.log("Input result:", inputResult);
