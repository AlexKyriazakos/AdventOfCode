const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input12.txt", { encoding: "utf-8" })
  .trim();

// const inputStr = `dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc`;

const data = inputStr.split(/\s+/);

console.log(data);

const graph = {};

data.forEach((l) => {
  const [root, child] = l.split("-");
  if (child !== "start") {
    graph[root] = graph[root] || [];
    graph[root].push(child);
  }
  if (child !== "end") {
    graph[child] = graph[child] || [];
    graph[child].push(root);
  }
});

console.log(graph);

const result = [];

findPath("start");

console.log(result, result.length);

function findPath(node, path = []) {
  if (node === "end") {
    result.push([...path, node]);
    return;
  }
  if (node === "start" && path.length > 0) return;

  graph[node].forEach((child) => {
    if (
      child === child.toUpperCase() ||
      isAllowed(child, [...path, node], true)
    )
      findPath(child, [...path, node]);
  });
}

function isAllowed(node, path, duplicate = false) {
  if (!duplicate) !path.includes(node);
  else if (!path.includes(node)) return true;
  else {
    const smallCaves = path.filter(
      (c) => c !== "start" && c === c.toLowerCase()
    );
    const uniqueSmallCaves = new Set([...smallCaves]);
    return uniqueSmallCaves.size === smallCaves.length;
  }
}
