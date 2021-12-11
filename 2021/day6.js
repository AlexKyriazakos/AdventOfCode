const fs = require("fs");

const input = fs.readFileSync("input6.txt", { encoding: "utf-8" }).trim();

// const input = `3,4,3,1,2`;

// Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.

const data = input.split(",").map(Number);

let days = 256;

// RUNS OUT OF MEMORY
// let fish = [...data];
// for (let i = 0; i < days; i++) {
//   let spawn = 0;
//   fish = fish.map((f) => {
//     --f;
//     if (f < 0) {
//       spawn += 1;
//       return 6;
//     }
//     return f;
//   });
//   const newFish = [...new Array(spawn)].map((f) => 8);
//   fish.push(...newFish);
// }

// console.log(fish, fish.length);

const fishCounter = data.reduce((obj, v) => {
  obj[v] = (obj[v] ?? 0) + 1;
  return obj;
}, {});

while (days > 0) {
  const fishAtZero = fishCounter[0] ?? 0;
  for (let i = 0; i < 8; i++) {
    fishCounter[i] = fishCounter[i + 1] ?? 0;
  }
  fishCounter[8] = fishAtZero;
  fishCounter[6] = fishCounter[6] + fishAtZero;

  days--;
}

console.log(Object.values(fishCounter).reduce((s, v) => (s += v), 0));
