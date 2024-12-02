const fs = require("fs");

const symbolRE = /[^\d\.]/;
const digitRE = /\d/;

const checkNeighbours = (x, y, arr) => {
  const rows = arr.length - 1;
  const cols = arr[0].length - 1;

  const pointsUsed = [];
  let numbers = [];
  let gearNumbers = [];

  const isGear = arr[x][y] === "*";

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        i < 0 ||
        i > rows ||
        j < 0 ||
        j > cols ||
        pointsUsed.includes(`${i}${j}`)
      )
        continue;
      if (digitRE.test(arr[i][j])) {
        let startY = j;
        while (digitRE.test(arr[i][startY - 1])) {
          startY -= 1;
        }

        // Beginning of number is in startY
        // Extract number left to right
        let endY = startY;
        let number = "";
        while (digitRE.test(arr[i][endY])) {
          number += arr[i][endY];
          pointsUsed.push(`${i}${endY}`);
          endY++;
        }
        // console.log(
        //   `Found number ${number} originating from symbol at (${x},${y})`
        // );
        numbers.push(Number(number));
        if (isGear) gearNumbers.push(number);
      }
    }
  }

  const gearRatio =
    gearNumbers.length > 1
      ? gearNumbers.reduce((p, v) => (p *= v), 1)
      : undefined;

  return [numbers, gearRatio];
};

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  // Find all the symbol locations
  const map = input.split(/\r?\n/).map((line) => line.split(""));

  let allPartNumbers = [];
  let allGearRatios = [];

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      const isSymbol = symbolRE.test(map[x][y]);
      if (isSymbol) {
        const [partNumbers, gearRatio] = checkNeighbours(x, y, map);
        allPartNumbers = [...allPartNumbers, ...partNumbers];
        if (gearRatio) allGearRatios.push(gearRatio);
      }
    }
  }
  return [
    allPartNumbers.reduce((s, v) => (s += v), 0),
    allGearRatios.reduce((s, v) => (s += v), 0),
  ];
}

const demoResult = solve("day3-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day3-input.txt");
console.log("Result:", inputResult);
