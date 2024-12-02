const fs = require("fs");
const demoInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const input = fs.readFileSync("test7.txt", { encoding: "utf-8" }).trim();

const findNode = (name, tree) => {
  if (tree.name === name) return tree;
  if (!tree.children) return;
  for (const child of tree.children) {
    const res = findNode(name, child);
    if (res) return res;
  }
};

const addNode = (node, name, tree) => {
  const subtree = findNode(name, tree);
  subtree.children.push(node);
  return true;
};

const calculateDirSize = (node) => {
  if (node.size) return Number(node.size);

  let dirSize = 0;
  for (const child of node.children) {
    const res = calculateDirSize(child);
    dirSize += res;
  }

  sizes[node.name] = (sizes[node.name] ?? 0) + dirSize;
  return dirSize;
};

const rows = input.trim().split(/\r?\n/);

let sizes = {};

let tree = { name: "/", children: [] };
let cwd = "";
rows.forEach((line) => {
  if (line.startsWith("$")) {
    command = line.slice(2);
    if (command.startsWith("cd")) {
      const path = command.slice(3);

      if (path === "/") {
        cwd = "/";
      } else if (path === "..") {
        const lastSlash = cwd.lastIndexOf("/");
        cwd = lastSlash === 0 ? "/" : cwd.slice(0, lastSlash);
      } else {
        cwd = cwd === "/" ? cwd + path : `${cwd}/${path}`;
      }
    }
  } else {
    const isDir = line.startsWith("dir");
    const [sizeOrType, name] = line.split(" ");

    const pathName = cwd === "/" ? cwd + name : `${cwd}/${name}`;
    const node = isDir
      ? { name: pathName, children: [] }
      : { name, size: sizeOrType };

    addNode(node, cwd, tree);
  }
});

// console.dir(tree, { depth: null });
calculateDirSize(tree);

const result = Object.values(sizes)
  .filter((v) => v <= 100000)
  .reduce((s, v) => (s += v), 0);

const currentUnused = 70000000 - sizes["/"];
const sizeNeeded = 30000000 - currentUnused;

const result2 = Object.values(sizes).reduce((min, current) => {
  if (current >= sizeNeeded && current < min) min = current;
  return min;
}, Infinity);

console.log(result, result2);
