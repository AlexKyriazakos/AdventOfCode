const fs = require("fs");
const input = fs
  .readFileSync("input10.txt", "utf-8")
  .split("\r\n")
  .map((el) => parseInt(el));

const sortInt = (arr) => [...arr].sort((a, b) => a - b);

const checkValidCombination = (array) => {
  const diffMap = array.map((el, idx) => el - (array[idx - 1] || 0));
  return diffMap.every((val) => val <= 3);
};

const countCombinations = (array, root = false) => {
  if (!checkValidCombination(array)) return 0;
  let count = 1;
  for (let i = 0; i < array.length; i++) {
    const newInput = [...array];
    newInput.splice(i, 1);
    count += 1; //countCombinations(newInput);
    if (root) console.log(i, count);
  }
  return count;
};

const sortedInput = sortInt(input);
sortedInput.push(sortedInput[sortedInput.length - 1] + 3);

const diffMap = sortedInput.map((el, idx) => el - (sortedInput[idx - 1] || 0));

console.log(diffMap);

const ones = diffMap.filter((val) => val === 1).length;
const threes = diffMap.filter((val) => val === 3).length;

console.log(ones * threes);

// PART 2 WE SUCK :(
