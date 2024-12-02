const fs = require("fs");

const deltas = {
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
  U: [-1, 0],
};

const hexDir = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
};

function getNeighbors(position, map) {
  const [x, y] = position;
  const deltas = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const result = [];
  for (const [deltaX, deltaY] of deltas) {
    const newX = x + deltaX;
    const newY = y + deltaY;

    const row = map.get(newX);
    if (row && row.get(newY) !== "#") {
      result.push([newX, newY]);
    }
  }
  return result;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input
    .split(/\r?\n/g)
    .map((v) => v.split(" ").map((x, i) => (i === 1 ? Number(x) : x)));

  let position = [0, 0];

  let map = new Map([[0, new Map([[0, "#"]])]]);

  for (const [dir, steps] of data) {
    // Parse hex instructions
    // console.log(hex);
    // const steps = parseInt(hex.slice(2, hex.length - 2), 16);
    // const dir = hexDir[hex[hex.length - 2]];

    let reps = steps;
    while (reps > 0) {
      const [x, y] = position;
      const [deltaX, deltaY] = deltas[dir];

      const nextX = x + deltaX;
      const nextY = y + deltaY;

      map.set(nextX, (map.get(nextX) ?? new Map()).set(nextY, "#"));

      position = [nextX, nextY];

      reps--;
    }
  }

  const minX = Math.min(...map.keys());
  const maxX = Math.max(...map.keys());

  const minYkeys = [...map.values()].map((v) => Math.min(...v.keys()));
  const maxYkeys = [...map.values()].map((v) => Math.max(...v.keys()));

  const minY = Math.min(...minYkeys);
  const maxY = Math.max(...maxYkeys);

  console.log({ minX, maxX, minY, maxY });

  let lines = [];
  for (let i = minX; i <= maxX; i++) {
    const row = map.get(i);
    let line = "";
    for (let j = minY; j <= maxY; j++) {
      line += row.get(j) ?? ".";
    }
    lines.push(line);
  }

  fs.writeFileSync("test.json", JSON.stringify(lines, null, 2));

  //   Try to flood fill this
  let frontier = [];
  const topRow = Math.min(...map.get(minX + 1).keys());

  const startPos = [minX + 1, topRow + 1];
  frontier.push(startPos);

  const reached = new Set();
  reached.add(`${startPos[0]},${startPos[1]}`);

  while (frontier.length) {
    let current = frontier.shift();
    for (const next of getNeighbors(current, map)) {
      const nextPoint = `${next[0]},${next[1]}`;
      if (!reached.has(nextPoint)) {
        frontier.push(next);
        reached.add(nextPoint);
      }
    }
  }
  const perimeter = [...map.values()].reduce((s, v) => (s += v.size), 0);
  const part1 = perimeter + reached.size;

  return [part1];
}

function solveWithShoelace(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input
    .split(/\r?\n/g)
    .map((v) => v.split(" ").map((x, i) => (i === 1 ? Number(x) : x)));

  let position = [0, 0];

  let vertices = [position];

  let perimeter = 0;

  for (const [, , hex] of data) {
    // Parse hex instructions
    const steps = parseInt(hex.slice(2, hex.length - 2), 16);
    const dir = hexDir[hex[hex.length - 2]];
    const [x, y] = position;

    switch (dir) {
      case "R":
        position = [x + steps, y];
        break;
      case "L":
        position = [x - steps, y];
        break;
      case "U":
        position = [x, y + steps];
        break;
      case "D":
        position = [x, y - steps];
        break;
    }

    perimeter += steps;
    vertices.push(position);
  }

  let s1 = 0;
  let s2 = 0;

  for (let i = 1; i < vertices.length; i++) {
    const prev = vertices[i - 1];
    const current = vertices[i];

    s1 += prev[0] * current[1];
    s2 += prev[1] * current[0];
  }

  // Shoelace formula
  const innerArea = Math.abs(s1 - s2) / 2;

  // Counted steps and got the forumla by testing the example output
  const outerArea = perimeter / 2 + 1;

  return innerArea + outerArea;
}

// const demoResult = solve("day18-demo-input.txt");
// console.log("Demo input result:", demoResult);

// console.time("Input solved in");

// const inputResult = solve("day18-input.txt");
// console.log("Input result:", inputResult);

// console.timeEnd("Input solved in");
const demoResult = solveWithShoelace("day18-demo-input.txt");
console.log("Demo input result:", demoResult);

console.time("Input solved in");

const inputResult = solveWithShoelace("day18-input.txt");
console.log("Input result:", inputResult);

console.timeEnd("Input solved in");
