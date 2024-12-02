const fs = require("fs");

const cardPower = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

function compareCards(a, b) {
  return cardPower[b] - cardPower[a];
}

function getHandPower(hand) {
  const counts = new Map();
  for (const card of hand) {
    const count = counts.get(card) ?? 0;
    counts.set(card, count + 1);
  }

  if (counts.size < 3) {
    // 7 for 5 of a kind
    // 6 for 4 of a kind
    // 5 for Full House
    return Math.max(...counts.values()) + 2;
  }

  if (counts.size === 3) {
    // 2 for 3 of a kind
    // 1 for two pairs
    return Math.max(...counts.values()) + counts.size - 2;
  }

  // 2 for 1 pair
  // 1 for no pairs
  return 6 - counts.size;
}

function getHandPowerWithJokers(hand) {
  const counts = new Map();
  for (const card of hand) {
    const count = counts.get(card) ?? 0;
    counts.set(card, count + 1);
  }
  if (!counts.has("J")) return getHandPower(hand);

  switch (counts.size) {
    case 1:
    // J and one other card means it's 5 of a kind now
    case 2: {
      return 7;
    }
    case 3: {
      const maxCount = Math.max(...counts.values());
      // 3 of a kind return 4 of a kind power
      if (maxCount === 3 || counts.get("J") > 1) {
        return 6;
      }
      // 2 pairs return full house
      else {
        return 5;
      }
    }
    case 4: {
      // One pair and one Joker or One pair of Jokers
      // 3 of a kind
      return 4;
    }
    case 5: {
      // No pairs but one Joker
      return 2;
    }
  }

  if (counts.size < 3) {
    // 7 for 5 of a kind
    // 6 for 4 of a kind
    // 5 for Full House
    return Math.max(...counts.values()) + 2;
  }

  if (counts.size === 3) {
    // 2 for 3 of a kind
    // 1 for two pairs
    return Math.max(...counts.values()) + counts.size - 2;
  }

  // 2 for 1 pair
  // 1 for no pairs
  return 6 - counts.size;
}

const compareHands =
  (withJoker = false) =>
  (a, b) => {
    if (a.power === b.power) {
      const powerMap = withJoker ? { ...cardPower, J: 1 } : cardPower;
      for (let i = 0; i < a.hand.length; i++) {
        const cardA = powerMap[a.hand[i]];
        const cardB = powerMap[b.hand[i]];
        const diff = cardB - cardA;
        if (diff === 0) continue;
        return diff > 0 ? 1 : -1;
      }
    }
    if (a.power > b.power) return -1;
    if (b.power > a.power) return 1;
  };

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/).map((s) => {
    const [hand, bid] = s.split(" ");
    const power = getHandPower(hand);
    return { hand, bid: Number(bid), power };
  });
  const sortedResult = data
    .toSorted(compareHands())
    .reverse()
    .reduce((res, current, i) => {
      res += current.bid * (i + 1);
      return res;
    }, 0);

  // Part 2

  const jokerData = input.split(/\r?\n/).map((s) => {
    const [hand, bid] = s.split(" ");
    const power = getHandPowerWithJokers(hand);
    return { hand, bid: Number(bid), power };
  });

  const sortedJokerResult = jokerData
    .toSorted(compareHands(true))
    .reverse()
    .reduce((res, current, i) => {
      res += current.bid * (i + 1);
      return res;
    }, 0);

  return [sortedResult, sortedJokerResult];
}

const demoResult = solve("day7-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day7-input.txt");
console.log("Input result:", inputResult);
