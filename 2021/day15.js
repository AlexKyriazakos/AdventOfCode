const fs = require("fs");
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  add(element, priority) {
    // creating object from queue element
    var qElement = { element, priority };
    var contain = false;

    // iterating through the entire
    // item array to add element at the
    // correct location of the Queue
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > qElement.priority) {
        // Once the correct location is found it is
        // enqueued
        this.items.splice(i, 0, qElement);
        contain = true;
        break;
      }
    }

    // if the element have the highest priority
    // it is added at the end of the queue
    if (!contain) {
      this.items.push(qElement);
    }
  }

  get() {
    return this.items.shift().element;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

const diff = [
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 0],
];

function getNeighbours(x, y, width, height) {
  const res = [];
  for (let i = 0; i < diff.length; i++) {
    const newX = x + diff[i][0];
    const newY = y + diff[i][1];

    if (newX < 0 || newX > height || newY < 0 || newY > width) continue;
    res.push(`${newX}|${newY}`);
  }
  return res;
}

function findShortestPath(grid) {
  const width = grid[0].length - 1;
  const height = grid.length - 1;
  const start = "0|0";
  const frontier = new PriorityQueue();
  frontier.add(start, 0);

  let came_from = {},
    cost_so_far = {};

  came_from[start] = null;
  cost_so_far[start] = 0;

  while (!frontier.isEmpty()) {
    const current = frontier.get();

    if (current === `${width}|${height}`) break;

    const [x, y] = current.split("|").map(Number);
    const neighbours = getNeighbours(x, y, width, height);

    neighbours.forEach((n) => {
      const [nextX, nextY] = n.split("|").map(Number);
      const newCost = cost_so_far[current] + grid[nextX][nextY];
      if (!cost_so_far[n] || newCost < cost_so_far[n]) {
        cost_so_far[n] = newCost;
        frontier.add(n, newCost);
        came_from[n] = current;
      }
    });
  }
  return cost_so_far[`${width}|${height}`];
}

const inputStr = fs
  .readFileSync(__dirname + "/input15.txt", { encoding: "utf-8" })
  .trim();

const data = inputStr.split(/\s+/).map((l) => l.split("").map(Number));

const res1 = findShortestPath(data);
console.log("Part 1:", res1);

/* PART 2 */

const tiles = [[data]];
for (let i = 0; i < 5; i++) {
  tiles[i] = tiles[i] ?? [];
  for (let j = 0; j < 5; j++) {
    if (i === 0 && j === 0) continue;
    if (i === 0) {
      tiles[i][j] = tiles[i][j - 1].map((r) =>
        r.map((n) => (n + 1 > 9 ? 1 : n + 1))
      );
    } else {
      tiles[i][j] = tiles[i - 1][j].map((r) =>
        r.map((n) => (n + 1 > 9 ? 1 : n + 1))
      );
    }
  }
}

const bigGrid = tiles.reduce((rowRes, tileRow) => {
  const newRow = tileRow.reduce((res, tile) => {
    tile.map((row, i) => {
      res[i] = res[i] ?? [];
      res[i] = [...res[i], ...row];
    });
    return res;
  }, new Array(tileRow[0].length));
  rowRes = [...rowRes, ...newRow];
  return rowRes;
}, []);

const res2 = findShortestPath(bigGrid);
console.log("Part 2:", res2);
