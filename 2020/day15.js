const input = [12, 1, 16, 3, 11, 0];

const history = [...input];
let lastNum = history[5];
console.log(lastNum, lastNum in history.slice(0, -1));
for (let i = 6; i < 2020; i++) {
  if (history.slice(0, -1).indexOf(lastNum) >= 0) {
    const lastTime = history.lastIndexOf(lastNum);
    const secondToLastTime = history.lastIndexOf(lastNum, lastTime - 1);
    history[i] = lastNum = lastTime - secondToLastTime;
  } else {
    history[i] = 0;
    lastNum = 0;
  }
}
console.log(history.slice(-1));

let memory = new Map();
let next;

for (let turn = 1; turn < 30000000; turn++) {
  const current = turn <= input.length ? input[turn - 1] : next;
  next = memory.has(current) ? turn - memory.get(current) : 0;
  memory.set(current, turn);
}

console.log(next);
