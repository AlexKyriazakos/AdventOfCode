const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/g).map((v) => v.split(""));
  console.log(data.map((v) => v.join(",")));
  return data;
}

const demoResult = solve("day11-demo-input.txt");
console.log("Demo input result:", demoResult);

// const inputResult = solve("day11-input.txt");
// console.log("Input result:", inputResult);
