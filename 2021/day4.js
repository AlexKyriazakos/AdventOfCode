const fs = require("fs");

const input = fs.readFileSync("input4.txt", { encoding: "utf-8" }).trim();

// const data =
// `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`
//     .trim()
//     .split("\n");

const data = input.split("\r\n");

function checkBoardForBingo(board) {
  for (let i = 0; i < 5; i++) {
    const column = board.reduce((col, row) => {
      col.push(row[i]);
      return col;
    }, []);
    if (column.every(Boolean)) {
      return true;
    }
  }
  if (board.some((r) => r.every(Boolean))) return true;
  return false;
}

let [numbers, ...boards] = data;

boards = boards
  .map((b) => b.split(" ").filter(Boolean))
  .reduce((res, value) => {
    if (!value.length) res.push(value);
    else (res[res.length - 1] || []).push(value);
    return res;
  }, []);

const result = [...new Array(boards.length)].map((b) =>
  [...new Array(5)].map((arr) => [...new Array(5)].map((_) => undefined))
);

let bingo = null;
let firstBingo = null;
numbers.split(",").forEach((number) => {
  // console.log(boards[0]);
  if (bingo) return;
  boards.forEach((board, bI) => {
    if (bingo) return;
    board.forEach((row, rI) => {
      if (bingo) return;
      const nI = row.indexOf(number);
      if (nI > -1) {
        row[nI] = undefined;
        result[bI][rI] = result[bI][rI] || [];
        result[bI][rI][nI] = number;
      }
      //   console.log(result[bI]);
      if (!firstBingo && checkBoardForBingo(result[bI]))
        firstBingo = `${bI}-${number}`;
    });
    if (result.every(checkBoardForBingo)) bingo = `${bI}-${number}`;
  });
  // console.log(boards[0]);
});

console.log(result);

const [board, number] = firstBingo.split("-");

console.log(firstBingo);

const remainingSum = boards[board]
  .flat()
  .filter(Boolean)
  .reduce((s, v) => (s += +v), 0);
const res1 = remainingSum * number;
console.log(res1);

const [lastBoard, lastNumber] = bingo.split("-");

console.log(bingo);
const lastSum = boards[lastBoard]
  .flat()
  .filter(Boolean)
  .reduce((s, v) => (s += +v), 0);
const res2 = lastSum * lastNumber;
console.log(res2);
