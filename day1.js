const fs = require("fs");

const input = fs
  .readFileSync("input1.txt")
  .toString()
  .split("\r\n")
  .filter((s) => s.length > 0)
  .map((s) => parseInt(s));

// Part 1
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    if (input[i] + input[j] == 2020)
      console.log(`Part 1: ${input[i]} * ${input[j]} = ${input[i] * input[j]}`);
  }
}

// Part 2
for (let i = 0; i < input.length; i++) {
  for (let j = i + 1; j < input.length; j++) {
    for (let k = j + 1; k < input.length; k++) {
      if (input[i] + input[j] + input[k] == 2020)
        console.log(
          `Part 2: ${input[i]} * ${input[j]} * ${input[k]} = ${
            input[i] * input[j] * input[k]
          }`
        );
    }
  }
}
