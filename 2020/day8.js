const fs = require("fs");
const input = fs.readFileSync("input8.txt", "utf-8").split("\r\n");

function checkForLoop(code) {
  let acc = 0;
  let i = 0;
  let lineHistory = {};
  let prevCommand = 0;
  while (i < code.length) {
    if (lineHistory[i]) return [true, [acc, i, prevCommand]];
    lineHistory[i] = true;
    let [cmd, value] = code[i].split(" ");
    prevCommand = { line: i, cmd, value };
    const parsedValue = parseInt(value);
    switch (cmd) {
      case "acc":
        acc += parsedValue;
        i++;
        break;
      case "jmp":
        i += parsedValue;
        break;
      default:
        i++;
    }
  }
  return [false, [acc, i, prevCommand]];
}

console.log(
  `Part 1: Accumulator value before infinite loop ${checkForLoop(input)[1][0]}`
);

for (let i = 0; i < input.length; i++) {
  const newInput = [...input];
  let [cmd, value] = input[i].split(" ");
  switch (cmd) {
    case "acc":
      continue;
    case "jmp":
      newInput[i] = `nop ${value}`;
      break;
    case "nop":
      newInput[i] = `jmp ${value}`;
      break;
    default:
  }
  const result = checkForLoop(newInput);

  if (!result[0]) {
    console.log(`Part 2: Accumulator value at the end ${result[1][0]}`);
    return;
  }
}
