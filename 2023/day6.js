const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((line) => line.split(/\s+/g));

  const [timeInput, distanceInput] = data;

  let result = 1;

  for (let i = 1; i < timeInput.length; i++) {
    const time = Number(timeInput[i]);
    const distance = Number(distanceInput[i]);

    const winningTimes = Array(time)
      .fill()
      .map((x, i) => i * (time - i))
      .filter((v) => v > distance);

    if (winningTimes.length) result *= winningTimes.length;
  }

  //   console.log(result);
  return result;
}

const demoResult = solve("day6-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day6-input.txt");
console.log("Input result:", inputResult);

// let finalResult = 1;
// const time = 71530;
// const distance = 940200;

// const winningTimes = Array(time)
//   .fill()
//   .map((x, i) => i * (time - i))
//   .filter((v) => v > distance);

// if (winningTimes.length) finalResult *= winningTimes.length;

// console.log({ finalResult });

let finalResult = 1;
const time = 62737565;
const distance = 644102312401023;

const winningTimes = Array(time)
  .fill()
  .map((x, i) => i * (time - i))
  .filter((v) => v > distance);

if (winningTimes.length) finalResult *= winningTimes.length;

console.log({ finalResult });
