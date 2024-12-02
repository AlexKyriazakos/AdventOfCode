const fs = require("fs");

function rollRocks(direction, data) {
  let positionDelta = [];

  switch (direction) {
    case "north":
    case "south":
      positionDelta = [-1, 0];
      break;
    case "west":
    case "east":
      positionDelta = [0, -1];
      break;
  }
  if (direction === "south") data = data.reverse();
  else if (direction === "east") data = data.map((line) => line.reverse());

  let rockMoved;

  do {
    rockMoved = false;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const [deltaX, deltaY] = positionDelta;
        if (data[i]?.[j] !== "O") continue;
        if (data[i + deltaX]?.[j + deltaY] === ".") {
          data[i + deltaX][j + deltaY] = "O";
          data[i][j] = ".";
          if (!rockMoved) rockMoved = true;
        }
      }
    }
  } while (rockMoved);

  if (direction === "south") data = data.reverse();
  else if (direction === "east") data = data.map((line) => line.reverse());

  return data;
}

function cycleRocks(data) {
  let result = rollRocks("north", data);
  result = rollRocks("west", result);
  result = rollRocks("south", result);
  result = rollRocks("east", result);
  return result;
}

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/g).map((line) => line.split(""));

  const part1Result = rollRocks("north", data);

  const part1Load = part1Result.reduce((sum, row, i) => {
    const rowBoulders = row.filter((v) => v === "O").length;
    sum += (part1Result.length - i) * rowBoulders;
    return sum;
  }, 0);

  const initialState = data.map((v) => v.join("")).join("\n");
  const pastResults = { [initialState]: [0] };

  let result = data;

  let cycles = 0;
  let output;
  let cycleFrequency;
  let cycleOffset;
  while (true) {
    result = cycleRocks(result);

    cycles++;
    output = result.map((v) => v.join("")).join("\n");
    pastResults[output] = [...(pastResults[output] ?? []), cycles];

    if (pastResults[output].length > 1) {
      cycleFrequency = pastResults[output][1] - pastResults[output][0];

      cycleOffset = pastResults[output][0];
      break;
    }
  }

  const remainder = (1000000000 - cycleOffset) % cycleFrequency;

  let part2Result = input.split(/\r?\n/g).map((line) => line.split(""));
  for (let i = 0; i < cycleOffset + remainder; i++) {
    part2Result = cycleRocks(part2Result);
  }

  const part2Load = part2Result.reduce((sum, row, i) => {
    const rowBoulders = row.filter((v) => v === "O").length;
    sum += (part2Result.length - i) * rowBoulders;
    return sum;
  }, 0);

  console.log(
    `After ${cycleOffset} cycles pattern repeats every ${cycleFrequency} cycles.`
  );

  return [part1Load, part2Load];
}

const demoResult = solve("day14-demo-input.txt");
console.log("Demo input result:", demoResult);

console.time("Input solved in");
const inputResult = solve("day14-input.txt");
console.log("Input result:", inputResult);

console.timeEnd("Input solved in");
