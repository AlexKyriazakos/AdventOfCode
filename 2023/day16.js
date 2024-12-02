const fs = require("fs");

function move(dir, x, y) {
  const deltas = {
    north: [-1, 0],
    west: [0, -1],
    south: [1, 0],
    east: [0, 1],
  };
  const [deltaX, deltaY] = deltas[dir];
  x += deltaX;
  y += deltaY;

  return [x, y];
}

function solveMap(data, { startX, startY, startDir }) {
  const mirror = {
    "/": {
      north: "east",
      west: "south",
      south: "west",
      east: "north",
    },
    "\\": {
      north: "west",
      west: "north",
      south: "east",
      east: "south",
    },
  };

  let beams = [{ x: startX, y: startY, dir: startDir }];
  let energizedCells = { [`${startX},${startY}`]: [startDir] };

  while (beams.length) {
    beams.forEach((beam, i) => {
      let { x, y, dir } = beam;
      if (!data[x]) {
        console.log({ x, y, dir, data });
      }
      const tile = data[x][y];
      switch (tile) {
        case ".":
          break;
        case "/":
        case "\\":
          dir = mirror[tile][dir];
          break;
        case "|":
          if (["north", "south"].includes(dir)) {
          } else {
            dir = "north";
            const [newX, newY] = move("south", x, y);
            beams.push({ x: newX, y: newY, dir: "south" });
          }
          break;
        case "-":
          if (["west", "east"].includes(dir)) {
          } else {
            dir = "west";
            const [newX, newY] = move("east", x, y);
            beams.push({ x: newX, y: newY, dir: "east" });
          }
          break;
      }
      [x, y] = move(dir, x, y);

      beams[i] = { x, y, dir };
    });

    beams = beams.filter(({ x, y, dir }) => {
      const inBounds =
        x >= 0 && y >= 0 && x < data.length && y < data[0].length;
      const hasPassed =
        energizedCells[`${x},${y}`] &&
        energizedCells[`${x},${y}`]?.includes(dir);
      return inBounds && !hasPassed;
    });

    beams.forEach(({ x, y, dir }) => {
      energizedCells[`${x},${y}`] = [
        ...(energizedCells[`${x},${y}`] ?? []),
        dir,
      ];
    });
  }

  const activeCells = Object.keys(energizedCells).length;

  return activeCells;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/g).map((line) => line.split(""));

  // Part 1
  const part1 = solveMap(data, {
    startX: 0,
    startY: 0,
    startDir: "east",
  });

  // Part 2
  let allCells = [];
  for (let i = 0; i < data[0].length; i++) {
    // Top row
    allCells.push(solveMap(data, { startX: 0, startY: i, startDir: "south" }));

    // Bottom row
    allCells.push(
      solveMap(data, {
        startX: data[0].length - 1,
        startY: i,
        startDir: "north",
      })
    );
  }

  for (let i = 0; i < data.length; i++) {
    // Left column
    allCells.push(solveMap(data, { startX: i, startY: 0, startDir: "east" }));

    // Right column
    allCells.push(
      solveMap(data, {
        startX: i,
        startY: data.length,
        startDir: "west",
      })
    );
  }

  const part2 = Math.max(...allCells);

  return [part1, part2];
}

const demoResult = solve("day16-demo-input.txt");
console.log("Demo input result:", demoResult);

console.time("Input solved in");

const inputResult = solve("day16-input.txt");
console.log("Input result:", inputResult);

console.timeEnd("Input solved in");
