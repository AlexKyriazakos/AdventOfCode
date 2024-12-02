const fs = require("fs");

const lt = (x, y) => x < y;
const gt = (x, y) => x > y;

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const [workflowsInput, partsInput] = input
    .split(/\r?\n\r?\n/g)
    .map((v) => v.split(/\r?\n/g));

  // Parse workflows
  const workflowRE = /^(.*){(.*)}/;

  const workflows = workflowsInput.reduce((res, line) => {
    const [, name, instructions] = workflowRE.exec(line);
    res[name] = instructions.split(",");
    return res;
  }, {});

  const parts = partsInput.map((part) => {
    return part
      .slice(1, part.length - 1)
      .split(",")
      .reduce((res, attributeInput) => {
        const [attribute, value] = attributeInput.split("=");
        res[attribute] = Number(value);
        return res;
      }, {});
  });

  const acceptedParts = [];
  for (const part of parts) {
    let workflow = workflows["in"];
    let resolution;
    while (!resolution) {
      for (const instruction of workflow) {
        const instructionParts = instruction.split(":");

        // Early exit if it's a simple goto instruction
        if (instructionParts.length === 1) {
          const [nextWorkflow] = instructionParts;
          if (["A", "R"].includes(nextWorkflow)) {
            resolution = nextWorkflow;
          } else {
            workflow = workflows[nextWorkflow];
          }
          break;
        }

        // Parse compare instruction
        const [condition, nextWorkflow] = instructionParts;
        const [attribute, operation, value] = condition.split(/([<>])/);
        const compareFn = operation === ">" ? gt : lt;
        if (compareFn(part[attribute], Number(value))) {
          if (["A", "R"].includes(nextWorkflow)) {
            resolution = nextWorkflow;
          } else {
            workflow = workflows[nextWorkflow];
          }
          break;
        }
      }
    }

    if (resolution === "A") acceptedParts.push(part);
  }

  const part1 = acceptedParts.reduce(
    (sum, part) =>
      (sum += Object.values(part).reduce((innerSum, v) => (innerSum += v), 0)),

    0
  );

  // All possible distinct combination of ratings
  // 4000⁴ = 256000000000000

  // To have a rating that gets accepted from px{a<2006:qkq,m>2090:A,rfg}
  // We need a < 2006 (so a {1..2005}) and m > 2090 (so m {2091..4000})
  // x {1..4000} m {2091..4000} a {1..2005} s {1.4000}
  // 4000 * 1910 * 2005 * 4000 = 61272800000000
  const part2 = getDistinctCombinations(workflows, "in");

  return [part1, part2];
}

const demoResult = solve("day19-demo-input.txt");
console.log("Demo input result:", demoResult);

const inputResult = solve("day19-input.txt");
console.log("Input result:", inputResult);

function getDistinctCombinations(
  workflows,
  workflowTitle,
  existingPermutations = {
    x: [0, 4000],
    m: [0, 4000],
    a: [0, 4000],
    s: [0, 4000],
  }
) {
  // First workflow s<1351:px,qqz
  // 4000³ * 1350 = 86400000000000
  // 4000⁴ - 86400000000000 = 169600000000000

  // or { x:4000, m: 4000, a: 4000, s:1350 } -> fed as the starting object for the px workflow
  // and { x:4000, m: 4000, a: 4000, s:4000-1350 } -> fed as the starting object for the qqz workflow

  // Assuming a final workflow of x>2662:A,R
  // { x: 4000-2662, m: 4000, a: 4000, s:4000 }
  // If :A then we add to the total number -> 85632000000000
  // If :R we can safely ignore that instruction
  // If :workflow we recurse passing the existing permutations object

  const workflow = workflows[workflowTitle];

  let permutations = 0;
  for (const instruction of workflow) {
    const instructionParts = instruction.split(":");

    // Early exit if it's a simple goto instruction
    if (instructionParts.length === 1) {
      const [nextWorkflow] = instructionParts;
      var t = calculatePermutations(existingPermutations);

      if (nextWorkflow === "A")
        permutations += calculatePermutations(existingPermutations);
      else if (nextWorkflow !== "R")
        permutations += getDistinctCombinations(
          workflows,
          nextWorkflow,
          existingPermutations
        );
      else return permutations;

      continue;
    }
    // Parse compare instruction
    const [condition, nextWorkflow] = instructionParts;
    const [attribute, operation, value] = condition.split(/([<>])/);

    const finalMinValue =
      operation === "<" ? existingPermutations[attribute][0] : Number(value);
    const finalMaxValue =
      operation === "<"
        ? Number(value) - 1
        : existingPermutations[attribute][1];

    const nextPermutations = {
      ...existingPermutations,
      [attribute]: [finalMinValue, finalMaxValue],
    };

    const existingMinValue =
      operation === "<"
        ? Number(value) - 1
        : existingPermutations[attribute][0];
    const existingMaxvalue =
      operation === "<" ? existingPermutations[attribute][1] : Number(value);

    existingPermutations = {
      ...existingPermutations,
      [attribute]: [existingMinValue, existingMaxvalue],
    };

    if (nextWorkflow === "A")
      permutations += calculatePermutations(nextPermutations);
    else if (nextWorkflow === "R") continue;
    else
      permutations += getDistinctCombinations(
        workflows,
        nextWorkflow,
        nextPermutations
      );
  }
  return permutations;
}

function calculatePermutations({ x, m, a, s }) {
  return (x[1] - x[0]) * (m[1] - m[0]) * (a[1] - a[0]) * (s[1] - s[0]);
}
