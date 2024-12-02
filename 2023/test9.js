const fs = require("fs");

const demoInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input = fs.readFileSync("test9.txt", { encoding: "utf-8" }).trim();

const data = demoInput.split(/\r?\n/);

console.log(data);

const head = [0, 0];
const tail = [0, 0];

data.forEach((row) => {
  const [dir, steps] = row.split(" ");
  console.log(dir, Number(steps));

  let remainingSteps = Number(steps);

  // Handle head movement
  while (remainingSteps > 0) {
    switch (dir) {
      case "R": {
        head[0] += 1;
        break;
      }
      case "U":
        head[1] += 1;
        break;
      case "L":
        head[0] -= 1;
        break;
      case "D":
        head[1] -= 1;
        break;
    }

    // Calculate tail distance
    


    remainingSteps--;
  }
});
