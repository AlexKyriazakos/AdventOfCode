const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input20.txt", { encoding: "utf-8" })
  .trim();

// const inputStr = `..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

// #..#.
// #....
// ##..#
// ..#..
// ..###`;

const [input1, input2] = inputStr.split(/\r?\n\r?\n/);

const inputImage = input2.split(/\s+/).map((line) => line.split(""));

const diff = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const getValue = (string) => (string === "#" ? 1 : 0);

const printGrid = (arr) =>
  console.log(
    arr
      .map((l) => l.map((v) => (v === "#" ? "\x1b[36m#\x1b[0m" : ".")).join(""))
      .join("\n")
  );

const padImage = (inputImage, char = ".") => {
  let zerosLine = [...new Array(inputImage[0].length + 2)].map(() => char);
  return [
    zerosLine,
    ...inputImage.map((line) => [char, ...line, char]),
    zerosLine,
  ];
};

function getNeighbours(x, y, arr, run) {
  const res = [];
  for (let i = 0; i < diff.length; i++) {
    const newX = x + diff[i][1];
    const newY = y + diff[i][0];

    let val;

    if (newX < 0 || newX >= arr.length || newY < 0 || newY >= arr[0].length)
      val = input1[0] === "." ? 0 : run % 2 === 0 ? 1 : 0;
    else val = getValue(arr[newX][newY]);
    res.push(val);
  }
  const index = parseInt(res.join(""), 2);
  return input1[index];
}

function enhanceImage(inputImage, run = 1) {
  const padChar = run % 2 === 0 ? "#" : ".";
  const image = padImage(inputImage, padChar);
  let outputImage = [];
  for (let i = 0; i < image.length; i++) {
    outputImage[i] = outputImage[i] ?? [];
    for (let j = 0; j < image[0].length; j++) {
      outputImage[i][j] = getNeighbours(i, j, image, run);
    }
  }
  return outputImage;
}

const enhancedV1 = enhanceImage(inputImage);

const enhancedV2 = enhanceImage(enhancedV1, 2);

const res1 = enhancedV2.reduce((total, line) => {
  const lineSum = line.reduce((s, p) => (s += p === "#" ? 1 : 0), 0);
  return (total += lineSum);
}, 0);
console.log("Part 1:", res1);

/* Part 2 */

let imagev50 = inputImage;
for (let i = 0; i < 50; i++) {
  imagev50 = enhanceImage(imagev50, i + 1);
}

const res2 = imagev50.reduce((total, line) => {
  const lineSum = line.reduce((s, p) => (s += p === "#" ? 1 : 0), 0);
  return (total += lineSum);
}, 0);

console.log("Part 2:", res2);
