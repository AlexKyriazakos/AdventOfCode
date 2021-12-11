const fs = require("fs");

const input = fs.readFileSync("input2.txt", { encoding: "utf-8" }).trim();

const data = input.split("\r\n");

console.log(data.length);

let x = 0,
  y = 0;
for (let i = 0; i < data.length; i++) {
  const [move, value] = data[i].split(" ");
  const val = Number(value);
  switch (move) {
    case "forward":
      x += val;
      break;
    case "down":
      y += val;
      break;
    case "up":
      y -= val;
      break;
    default:
      break;
  }
}

const res = x * y;
console.log(x, y, res);

let aim = 0;
x = 0;
y = 0;

for (let i = 0; i < data.length; i++) {
  const [move, value] = data[i].split(" ");
  const val = Number(value);
  switch (move) {
    case "forward":
      x += val;
      y += val * aim;
      break;
    case "down":
      aim += val;
      break;
    case "up":
      aim -= val;
      break;
    default:
      break;
  }
}

const res2 = x * y;
console.log(x, y, res2);
