const fs = require("fs");

function findDiffs(history) {
  //   console.log("in diff:", history);
  let diff = history.reduce((res, current, i, arr) => {
    if (i !== 0) res.push(current - arr[i - 1]);
    return res;
  }, []);
  if (diff.every((v) => v === 0)) return history[history.length - 1];
  const innerResult = findDiffs(diff);

  return history[history.length - 1] + innerResult;
}

function findBackDiffs(history) {
  //   console.log("In back diff", history);
  let diff = history.reduce((res, current, i, arr) => {
    if (i !== 0) res.push(current - arr[i - 1]);
    return res;
  }, []);
  //   console.log({ history, diff });
  if (diff.every((v) => v === 0)) return history[0];
  const innerResult = findBackDiffs(diff);

  //   console.log({ innerResult, v: history[0], r: history[0] - innerResult });

  return history[0] - innerResult;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input
    .split(/\r?\n/g)
    .map((line) => line.split(" ").map((v) => Number(v)));

  const result = data.map((history) => findDiffs(history));

  //   console.log({ result });

  const result2 = data.map((history) => findBackDiffs(history));

  //   console.log({ result2 });

  return [
    result.reduce((s, v) => (s += v), 0),
    result2.reduce((s, v) => (s += v), 0),
  ];
}

const demoResult = solve("day9-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day9-input.txt");
console.log("Input result:", inputResult);
