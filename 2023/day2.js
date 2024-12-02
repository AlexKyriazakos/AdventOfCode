const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const gameIdRE = /Game\s(\d+):\s(.*)/g;
  const limitsMap = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let partOneResult = [];
  let partTwoResult = [];

  const data = input.split(/\r?\n/);

  for (let i = 0; i < data.length; i++) {
    const game = data[i];

    const matches = [...game.matchAll(gameIdRE)][0];
    const gameId = Number(matches[1]);
    const gameSubsets = matches[2];

    const gameResult = gameSubsets.split("; ").every((subset) => {
      return subset.split(", ").every((value) => {
        const [amount, type] = value.split(" ");

        return Number(amount) <= limitsMap[type];
      });
    });

    if (gameResult) partOneResult.push(gameId);

    // Part 2
    const minCubes = gameSubsets.split("; ").reduce(
      (res, subset) => {
        subset.split(", ").forEach((value) => {
          const [amount, type] = value.split(" ");
          if (res[type] < amount) res[type] = Number(amount);
        });
        return res;
      },
      { red: 0, green: 0, blue: 0 }
    );

    const minCubesPower = Object.values(minCubes).reduce((p, v) => (p *= v), 1);
    partTwoResult.push(minCubesPower);
  }

  const sum1 = partOneResult.reduce((s, v) => (s += v), 0);
  const sum2 = partTwoResult.reduce((s, v) => (s += v), 0);
  return [sum1, sum2];
}

const demoResult = solve("day2-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day2-input.txt");
console.log("Result:", inputResult);
