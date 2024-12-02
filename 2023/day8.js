const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const [instructions, data] = input.split(/\r?\n\r?\n/g);

  const elements = data.split(/\r?\n/g).reduce((res, line) => {
    const [point, moves] = line.split(" = ");

    res[point] = moves.match(/\w+/g);
    return res;
  }, {});

  //   console.log(instructions, elements, instructions.length);
  //   return;

  let instructionIndex = 0;
  let elementKey = "AAA";

  let steps = 0;

  while (elementKey !== "ZZZ") {
    steps++;
    const values = elements[elementKey];
    const instruction = instructions[instructionIndex] === "L" ? 0 : 1;
    // console.log({ steps, elementKey, instruction, instructionIndex });

    elementKey = values[instruction];
    instructionIndex++;
    if (instructionIndex >= instructions.length) {
      instructionIndex = 0;
    }
  }

  return steps;
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b);

const lcm = (a, b) => (a * b) / gcd(a, b);

function solvePartTwo(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const [instructions, data] = input.split(/\r?\n\r?\n/g);

  const elements = data.split(/\r?\n/g).reduce((res, line) => {
    const [point, moves] = line.split(" = ");

    res[point] = moves.match(/\w+/g);
    return res;
  }, {});

  // Find all keys that end with A
  let keys = Object.keys(elements).filter((s) => s.endsWith("A"));

  // Find the distance between each starting key and their respective Z ending
  let multiples = keys.map((key) => {
    let currentKey = key;
    let steps = 0;
    let instructionIndex = 0;
    while (!currentKey.endsWith("Z")) {
      steps++;
      const instruction = instructions[instructionIndex] === "L" ? 0 : 1;
      currentKey = elements[currentKey][instruction];

      instructionIndex++;
      if (instructionIndex >= instructions.length) {
        instructionIndex = 0;
      }
    }
    return steps;
  });

  // Calculate the Least Common Multiple of these distances to find the steps required for them to sync up
  // Solved by looking at reddit, naive implementation ran forever.
  return multiples.reduce(lcm);
}

const demoResult = solve("day8-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day8-input.txt");
console.log("Input result:", inputResult);

const inputResultTwo = solvePartTwo("day8-input.txt");
console.log("Input result 2:", inputResultTwo);
