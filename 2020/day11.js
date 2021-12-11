const fs = require("fs");
const input = fs
  .readFileSync("input11.txt", "utf-8")
  .split("\r\n")
  .map((str) => [...str]);

const width = input[0].length - 1;
const height = input.length - 1;

const checkAdjacentSeats = (x, y, arr) => {
  let free = 0,
    taken = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i > width) continue;
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j > height || (i === x && j === y)) continue;
      switch (arr[i][j]) {
        case "#":
          taken += 1;
          break;
        case "L":
          free += 1;
          break;
        default:
      }
    }
  }
  return [free, taken];
};

const runSimulation = (array) => {
  const newInput = array.map((el) => [...el]);
  for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= height; j++) {
      if (array[i][j] === ".") continue;
      const [free, taken] = checkAdjacentSeats(i, j, array);
      if (array[i][j] === "#" && taken > 3) newInput[i][j] = "L";
      else if (array[i][j] === "L" && !taken) newInput[i][j] = "#";
    }
  }
  return newInput;
};

// let inputStr = "a";
// let resultStr = "b";
// let inputArray = input.map((el) => [...el]);

// while (inputStr !== resultStr) {
//   let result = runSimulation(inputArray);

//   inputStr = inputArray.map((el) => el.join("")).join("\n");
//   resultStr = result.map((el) => el.join("")).join("\n");

//   inputArray = result.map((el) => [...el]);
// }

// const takenSeats = inputArray.reduce(
//   (sum, row) => (sum += row.filter((seat) => seat === "#").length),
//   0
// );

// console.log(takenSeats);

const move = (x, y, direction) => {
  let newX = x,
    newY = y;
  switch (direction) {
    case "N":
      newX -= 1;
      break;
    case "NE":
      newX -= 1;
      newY += 1;
      break;
    case "E":
      newY += 1;
      break;
    case "SE":
      newX += 1;
      newY += 1;
      break;
    case "S":
      newX += 1;
      break;
    case "SW":
      newX += 1;
      newY -= 1;
      break;
    case "W":
      newY -= 1;
      break;
    case "NW":
      newX -= 1;
      newY -= 1;
      break;
    default:
  }
  return [newX, newY];
};

const checkSeatsWithLOS = (initialX, initialY, array) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  let free = 0,
    taken = 0;

  for (const direction of directions) {
    let currentX = initialX;
    let currentY = initialY;
    while (true) {
      const [newX, newY] = move(currentX, currentY, direction);
      if (newX < 0 || newX > width || newY < 0 || newY > height) break;
      if (array[newX][newY] === ".") {
        currentX = newX;
        currentY = newY;
        continue;
      }
      switch (array[newX][newY]) {
        case "#":
          taken += 1;
          break;
        case "L":
          free += 1;
          break;
        default:
      }
      break;
    }
  }
  return [free, taken];
};

const runSimulationV2 = (array) => {
  const newInput = array.map((el) => [...el]);
  for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= height; j++) {
      if (array[i][j] === ".") continue;
      const [free, taken] = checkSeatsWithLOS(i, j, array);
      if (array[i][j] === "#" && taken > 4) newInput[i][j] = "L";
      else if (array[i][j] === "L" && !taken) newInput[i][j] = "#";
    }
  }
  return newInput;
};

let inputStr = "a";
let resultStr = "b";
let inputArray = input.map((el) => [...el]);

while (inputStr !== resultStr) {
  let result = runSimulationV2(inputArray);

  inputStr = inputArray.map((el) => el.join("")).join("\n");
  resultStr = result.map((el) => el.join("")).join("\n");

  inputArray = result.map((el) => [...el]);
}

const takenSeats = inputArray.reduce(
  (sum, row) => (sum += row.filter((seat) => seat === "#").length),
  0
);

console.log(takenSeats);
