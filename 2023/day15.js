const fs = require("fs");

const asciiTable = {
  " ": 32,
  "!": 33,
  '"': 34,
  "#": 35,
  $: 36,
  "%": 37,
  "&": 38,
  "'": 39,
  "(": 40,
  ")": 41,
  "*": 42,
  "+": 43,
  ",": 44,
  "-": 45,
  ".": 46,
  "/": 47,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  ":": 58,
  ";": 59,
  "<": 60,
  "=": 61,
  ">": 62,
  "?": 63,
  "@": 64,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  "[": 91,
  "\\": 92,
  "]": 93,
  "^": 94,
  _: 95,
  "`": 96,
  a: 97,
  b: 98,
  c: 99,
  d: 100,
  e: 101,
  f: 102,
  g: 103,
  h: 104,
  i: 105,
  j: 106,
  k: 107,
  l: 108,
  m: 109,
  n: 110,
  o: 111,
  p: 112,
  q: 113,
  r: 114,
  s: 115,
  t: 116,
  u: 117,
  v: 118,
  w: 119,
  x: 120,
  y: 121,
  z: 122,
  "{": 123,
  "|": 124,
  "}": 125,
  "~": 126,
};

function hash(currentValue, character) {
  return ((currentValue + asciiTable[character]) * 17) % 256;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/,/g);

  const part1Result = data
    .map((str) => str.split("").reduce(hash, 0))
    .reduce((s, v) => (s += v), 0);

  let results = Array(256).fill();
  data.forEach((v) => {
    const [label, operation, value] = v.split(/([-=])/);
    const boxNr = label.split("").reduce(hash, 0);

    if (operation === "-" && results[boxNr]?.length) {
      const lensIndex = results[boxNr].findIndex(
        (lens) => lens.label === label
      );
      if (lensIndex >= 0)
        results[boxNr] = results[boxNr].toSpliced(lensIndex, 1);
    } else if (operation === "=") {
      const newLens = { label, value };

      if (!results[boxNr]) results[boxNr] = [newLens];
      else {
        const lensIndex = results[boxNr].findIndex(
          (lens) => lens.label === label
        );
        if (lensIndex >= 0) results[boxNr][lensIndex] = newLens;
        else results[boxNr].push(newLens);
      }
    }

    // console.log(`After "${v}":`);

    // results.forEach((r, i) => {
    //   if (r?.length) {
    //     const contents = r
    //       .map((lens) => `[${lens.label} ${lens.value}]`)
    //       .join(" ");
    //     console.log(`Box ${i}: ${contents}`);
    //   }
    // });
    // console.log("");
  });

  const part2Result = results.reduce((sum, box, boxNr) => {
    if (box?.length)
      sum += box.reduce((boxSum, lens, lensIndex) => {
        boxSum += (boxNr + 1) * (lensIndex + 1) * lens.value;
        return boxSum;
      }, 0);
    return sum;
  }, 0);

  return [part1Result, part2Result];
}

const demoResult = solve("day15-demo-input.txt");
console.log("Demo input result:", demoResult);

console.time("Input solved in");

const inputResult = solve("day15-input.txt");
console.log("Input result:", inputResult);

console.timeEnd("Input solved in");
