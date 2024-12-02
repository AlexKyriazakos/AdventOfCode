const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n/g).reduce((res, line) => {
    const [module, action] = line.split(" -> ");
    let name, type;
    if (module !== "broadcaster") {
      name = module.slice(1);
      type = module.startsWith("%") ? "ff" : "cj";
    } else name = type = module;

    res[name] = { type, actions: action.split(", ") };
    return res;
  }, {});

  let queue = ["broadcaster"];

  while (queue.length) {
    const current = queue.shift();
    console.log({ current });
    const { actions } = data[current];

    for (const action of actions) {
      queue.push(action);
    }
  }

  return data;
}

const demoResult = solve("day20-demo-input.txt");
console.log("Demo input result:", demoResult);

// const inputResult = solve("day20-input.txt");
// console.log("Input result:", inputResult);
