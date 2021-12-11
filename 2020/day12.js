const fs = require("fs");
const input = fs.readFileSync("input12.txt", "utf-8").split("\r\n");

const move = (x, y, direction) => {
  switch (direction) {
    case "N":
      x -= 1;
      break;
    case "E":
      y += 1;
      break;
    case "S":
      x += 1;
      break;
    case "W":
      y -= 1;
      break;
    default:
  }
  return [x, y];
};

const directions = ["N", "E", "S", "W"];

let position = [0, 0];
let currentDirection = "E";

for (line of input) {
  let [cmd, ...rest] = line;
  let value = Number(rest.join(""));
  let direction = ["L", "R", "F"].includes(cmd) ? currentDirection : cmd;

  if (cmd === "L") {
    const rotation = -Math.ceil(value / 90);
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = currentIndex + rotation;
    currentDirection =
      newIndex < 0 ? directions[newIndex + 4] : directions[newIndex];
  } else if (cmd === "R") {
    const rotation = Math.ceil(value / 90);
    const currentIndex = directions.indexOf(currentDirection);
    const newIndex = currentIndex + rotation;
    currentDirection =
      newIndex >= directions.length
        ? directions[newIndex - 4]
        : directions[newIndex];
  } else {
    for (let i = 0; i < value; i++) {
      const [x, y] = position;
      position = move(x, y, direction);
    }
  }
}

console.log(position);
const [x, y] = position;
const result = Math.abs(x) + Math.abs(y);

console.log(result);
