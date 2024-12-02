const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/g).map((v) => v.split(" "));
  console.log(data);

  data.forEach(([row, valueStr]) => {
    const values = valueStr.split(",").map((v) => Number(v));

    const segments = row.split(/\.+/).filter(Boolean);

    console.log(row, segments, values);
  });

  //   return data;
}

const demoResult = solve("day12-demo-input.txt");
console.log("Demo input result:", demoResult);

// const inputResult = solve("day11-input.txt");
// console.log("Input result:", inputResult);
