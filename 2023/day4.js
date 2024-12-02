const fs = require("fs");

function findWinners(values) {
  const [winningNumbersStr, cardNumbersStr] = values.split(" | ");

  const winningNumbers = winningNumbersStr
    .trim()
    .split(/\s+/)
    .map((v) => Number(v));
  const cardNumbers = cardNumbersStr
    .trim()
    .split(/\s+/)
    .map((v) => Number(v));
  let winners = cardNumbers.filter((num) => winningNumbers.includes(num));

  return winners;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((line) => {
    const [_cardId, values] = line.split(": ");
    return values;
  });
  const totalWinnings = data.reduce((result, values) => {
    const winners = findWinners(values);

    if (winners.length) result += Math.pow(2, winners.length - 1);
    return result;
  }, 0);

  let amounts = data.map(() => 1);

  for (let i = 0; i < data.length; i++) {
    const winners = findWinners(data[i]).length;

    let innerCount = i + 1;
    while (i + winners >= innerCount) {
      amounts[innerCount] += amounts[i] * 1;
      innerCount++;
    }
  }

  const totalCards = amounts.reduce((s, v) => (s += v), 0);
  return { totalWinnings, totalCards };
}

const demoResult = solve("day4-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day4-input.txt");
console.log("Result:", inputResult);
