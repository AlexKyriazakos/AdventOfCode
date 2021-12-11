const fs = require("fs");

const input = fs
  .readFileSync("input2.txt")
  .toString()
  .split("\r\n")
  .filter((s) => s.length > 0);

const reg = new RegExp(/(\d+)-(\d+)\s(\w):\s(\w+)/);
let count = 0;
for (let i = 0; i < input.length; i++) {
  const res = input[i].match(reg);
  const min = res[1];
  const max = res[2];
  const char = res[3];
  const pw = res[4];

  const innerReg = new RegExp(char, "g");
  const occurences = (pw.match(innerReg) || []).length;

  count = occurences >= min && occurences <= max ? count + 1 : count;
}

console.log(`Part 1: ${count} valid passwords`);

let count2 = 0;
for (let i = 0; i < input.length; i++) {
  const res = input[i].match(reg);
  const pos1 = res[1];
  const pos2 = res[2];
  const char = res[3];
  const pw = res[4];

  const valid1 = pw.charAt(pos1 - 1) === char;
  const valid2 = pw.charAt(pos2 - 1) === char;

  count2 = valid1 != valid2 ? count2 + 1 : count2;
}

console.log(`Part 2: ${count2} valid passwords`);
