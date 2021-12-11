const fs = require("fs");

const input = fs.readFileSync("input7.txt", { encoding: "utf-8" }).trim();

// const input = `16,1,2,0,4,2,7,1,2,14`;

const data = input.split(",").map(Number);

const min = Math.min(...data);
const max = Math.max(...data);

const constantFuel = {};
const dynamicFuel = {};
for (let i = min; i <= max; i++) {
  constantFuel[i] = data
    .map((el) => Math.abs(el - i))
    .reduce((s, v) => (s += v), 0);
  dynamicFuel[i] = data
    .map((el) => {
      // sum of the n natural numbers from 1 to n
      // https://en.wikipedia.org/wiki/Triangular_number
      const dist = Math.abs(el - i);
      return (dist * (dist + 1)) / 2;
    })
    .reduce((s, v) => (s += v), 0);
}

console.log(Math.min(...Object.values(constantFuel)));
console.log(Math.min(...Object.values(dynamicFuel)));
