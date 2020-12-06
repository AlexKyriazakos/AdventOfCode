const fs = require("fs");
const input = fs.readFileSync("input6.txt", "utf-8").split("\r\n\r\n");

const uniqueAnswersCount = input
  .map((answer) => answer.replace(/\r\n/g, ""))
  .map((answers) => [...new Set(answers)].length);

console.log(
  `Part 1: Sum of questions that anyone answered "yes" ${uniqueAnswersCount.reduce(
    (sum, cv) => (sum += cv),
    0
  )}`
);

const groupAnswers = input.map((group) => group.split("\r\n"));

const answerCounts = groupAnswers.reduce((groupCounts, individualAnswer) => {
  const obj = individualAnswer.reduce((result, current) => {
    [...current].forEach((key) => {
      result[key] = (result[key] || 0) + 1;
    });
    return result;
  }, {});
  const res = Object.entries(obj).filter(
    ([, value]) => value === individualAnswer.length
  ).length;
  groupCounts.push(res);
  return groupCounts;
}, []);
console.log(
  `Part 2: Sum of questions that everyone answered "yes" ${answerCounts.reduce(
    (sum, cv) => (sum += cv),
    0
  )}`
);
