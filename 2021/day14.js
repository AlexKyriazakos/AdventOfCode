const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input14.txt", { encoding: "utf-8" })
  .trim();

// const inputStr = `NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`;

// NC -> NBC -> NBBBC -> NBBNBNBBC

const [input1, _, ...input2] = inputStr.split(/\r\n/);

console.log(input1, input2);

const dictionary = input2.reduce((obj, l) => {
  const [key, output] = l.split(" -> ");
  obj[key] = output;
  return obj;
}, {});

let pairs = {};
for (let i = 0; i < input1.length - 1; i++) {
  const key = input1[i] + input1[i + 1];
  pairs[key] = (pairs[key] ?? 0) + 1;
}
let lastPair = input1[input1.length - 2] + input1[input1.length - 1];

for (let i = 0; i < 40; i++) {
  console.log(`Step ${i + 1}`);
  pairs = stepPairs(pairs);
  lastPair = dictionary[lastPair] + lastPair[1];
  printCount(pairs);
}

function printCount(object) {
  const charCount = Object.keys(object).reduce((res, pair, index, arr) => {
    const [charA, charB] = pair;
    res[charA] = (res[charA] ?? 0) + object[pair];
    if (pair === lastPair) {
      res[charB] = (res[charB] ?? 0) + 1;
    }
    return res;
  }, {});
  const totals = Object.values(charCount);

  const result = Math.max(...totals) - Math.min(...totals);

  console.log(charCount, "\nMAX-MIN:", result);
}

function stepPairs(stepInput) {
  let result = {};
  Object.keys(stepInput).forEach((el) => {
    const res = dictionary[el];
    const [charA, charB] = el;

    const newPair1 = charA + res;
    const newPair2 = res + charB;

    result[newPair1] = (result[newPair1] ?? 0) + stepInput[el];
    result[newPair2] = (result[newPair2] ?? 0) + stepInput[el];
  });
  return result;
}
