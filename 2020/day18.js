const fs = require("fs");
const input = fs
  .readFileSync("input18.txt", "utf-8")
  .split("\r\n")
  .map((row) => row.replace(/\s+/g, ""));

const operators = ["+", "-", "*"];
const prec = { "+": 1, "-": 0, "*": 0 };

const result = input.map((line) => {
  const outQueue = [];
  const opStack = [];
  for (let i = 0; i < line.length; i++) {
    const token = line[i];
    // console.log(token);
    if (!isNaN(Number(token))) {
      outQueue.push(token);
    } else if (operators.includes(token)) {
      while (
        opStack.length > 0 &&
        opStack.slice(-1)[0] !== "(" &&
        prec[opStack.slice(-1)[0]] > prec[token]
      ) {
        outQueue.push(opStack.pop());
      }
      opStack.push(token);
    } else if (token === "(") {
      opStack.push(token);
    } else if (token === ")") {
      //   console.log(opStack);
      while (opStack.slice(-1)[0] !== "(") {
        outQueue.push(opStack.pop());
      }
      opStack.pop();
    }
  }

  while (opStack.length > 0) {
    outQueue.push(opStack.pop());
  }

  function calc(x, y, op) {
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "*":
        return x * y;
      default:
    }
  }

  const stack = [];
  for (let i = 0; i < outQueue.length; i++) {
    const token = outQueue[i];
    if (operators.includes(token)) {
      const x = stack.pop();
      const y = stack.pop();
      const res = calc(x, y, token);
      stack.push(res);
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
});

console.log(result);

console.log(result.reduce((sum, cv) => sum + cv, 0));
