const fs = require("fs");

const input = fs.readFileSync("input1.txt", { encoding: "utf-8" }).trim();

const data = input.split("\r\n").map((l) => Number(l));

console.log(data.length);

const res1 = data
  .map((el, i) => {
    if (i > 0) {
      const res = el > data[i - 1] ? "I" : "D";
      return res;
    } else return "D";
  })
  .filter((el) => el === "I").length;

console.log(res1);

let sums = [];

for (let i = 0; i < data.length; i++) {
  if (i + 2 < data.length) {
    sums[i] = data.slice(i, i + 3).reduce((s, v) => (s += v), 0);
  }
}

const res2 = sums.filter((s, i) => {
  if (i > 0) return s > sums[i - 1];
  return false;
}).length;

console.log(res2);
