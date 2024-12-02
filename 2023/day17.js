const fs = require("fs");

function getNeighbors(map, x, y) {
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
    if (newX >= 0 && newY >= 0 && newX < map.length && newY < map[0].length)
      result.push([newX, newY]);
  }
  return result;
}

function sortedInsert(arr, element, graph) {
  // Find the position where the element should be inserted
  let i = arr.length - 1;
  const value = graph[element[0]][element[1]];
  while (i >= 0 && arr[i][2] > element[2]) {
    arr[i + 1] = arr[i]; // Shift elements to the right
    i--;
  }

  // Insert the element
  arr[i + 1] = element;
}

function checkLastThree(path, currentPoint) {
  let lastThreeSteps = [];
  let current = currentPoint;
  while (current !== "0,0" && lastThreeSteps.length < 3) {
    lastThreeSteps.push(current);
    current = path.get(current);
  }

  if (lastThreeSteps.length < 3) return false;
}

function getDirection(x1, y1, x2, y2) {
  if (x1 > x2) return "north";
  if (x2 > x1) return "south";
  if (y1 > y2) return "west";
  if (y2 > y1) return "east";
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input
    .split(/\r?\n/g)
    .map((line) => line.split("").map((v) => +v));

  const frontier = [];
  sortedInsert(frontier, [0, 0, "east", 1]);

  const visited = new Map();
  visited.set(`0,0`, [null, "east"]);

  const cost = { "0,0": 0 };

  while (frontier.length) {
    const [x, y] = frontier.shift();
    const currentPoint = `${x},${y}`;

    // Backtrack to see if I've done 3 consecutive steps in one direction
    let lastThreeSteps = [];
    let current = visited.get(currentPoint);
    while (current && current?.[0] !== "0,0" && lastThreeSteps.length < 3) {
      lastThreeSteps.push(current[1]);
      current = visited.get(current[0]); // 0,0
    }

    let mustTurn = false;
    if (lastThreeSteps.length > 2 && new Set(lastThreeSteps).size === 1)
      mustTurn = true;

    for (const next of getNeighbors(data, x, y)) {
      const [newX, newY] = next;
      const nextPoint = `${newX},${newY}`;

      // if (newX === data.length - 3 && newY === data[0].length - 1) {
      //   console.log("test");
      // }

      const dir = getDirection(x, y, newX, newY);
      const costOffset = mustTurn && dir === lastThreeSteps[0] ? Infinity : 0;

      const newCost = cost[currentPoint] + data[newX][newY] + costOffset;

      // console.log(`[${x},${y}] -> [${nextPoint}] Cost: ${newCost}`);

      if (!visited.has(nextPoint) || newCost < cost[nextPoint]) {
        cost[nextPoint] = newCost;
        sortedInsert(frontier, [...next, newCost]);
        visited.set(nextPoint, [currentPoint, dir]);
      }
    }
  }

  console.log(cost[`${data.length - 1},${data[0].length - 1}`]);

  let path = [];
  const goal = `${data.length - 1},${data[0].length - 1}`;
  let current = goal;
  while (current !== "0,0") {
    path.push(current);
    [current] = visited.get(current);
  }

  //   return data;

  let result = input.split(/\r?\n/g).map((line) => line.split(""));

  // console.log(path.toReversed());

  const symbols = {
    north: "^",
    south: "v",
    east: ">",
    west: "<",
  };

  path.toReversed().forEach((v, i, arr) => {
    const [x2, y2] = v.split(",");
    const [x1, y1] = arr[i - 1] ? arr[i - 1].split(",") : [0, 0];
    const dir = getDirection(x1, y1, x2, y2);
    const symbol = symbols[dir];
    // console.log({ v, dir, symbol });
    result[x2][y2] = symbol;
  });
  // console.log(result.map((line) => line.join("")).join("\n"));
}

const demoResult = solve("day17-demo-input.txt");
console.log("Demo input result:", demoResult);

// console.time("Input solved in");

// const inputResult = solve("day17-input.txt");
// console.log("Input result:", inputResult);

// console.timeEnd("Input solved in");
