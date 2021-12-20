const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input17.txt", { encoding: "utf-8" })
  .trim();

const log = (...args) => DEBUG && console.log(...args);

const DEBUG = true;

function getAllVelY(minY, maxY) {
  let validVelocities = {};

  for (let i = -1000; i < 1000; i++) {
    let steps = 0,
      posY = 0;
    let maxHeight = posY;
    let velocity = i;
    while (true) {
      steps++;
      posY += velocity;
      maxHeight = Math.max(maxHeight, posY);
      if (posY <= maxY && posY >= minY) {
        validVelocities[`${i}|${steps}`] = maxHeight;
      }
      if (posY < minY) break;
      velocity--;
    }
  }

  return validVelocities;
}

function getAllVelX(minX, maxX) {
  let validVelocities = {};

  for (let i = 1; i < 1000; i++) {
    let steps = 0,
      posX = 0;
    let velocity = i;
    while (velocity > 0) {
      steps++;
      posX += velocity;
      if (posX <= maxX && posX >= minX) {
        validVelocities[`${i}|${steps}`] = true;
      }
      if (posX > maxX) break;
      velocity = Math.max(0, velocity - 1);
    }
  }

  return validVelocities;
}

const [_, xMin, xMax, yMin, yMax] = inputStr
  .match(/x=([-\d]+)\.+([-\d]+).*y=([-\d]+)\.+([-\d]+)/)
  .map(Number);

const allY = getAllVelY(yMin, yMax);

const allX = getAllVelX(xMin, xMax);

let maxHeight = 0;
Object.keys(allY)
  .reverse()
  .forEach((velY) => {
    const [vel, steps] = velY.split("|").map(Number);
    const matchingVelX = Object.keys(allX).filter((key) => {
      const [velX, xSteps] = key.split("|").map(Number);
      if (velX <= xSteps) return steps >= xSteps;
      return steps === xSteps;
    });
    if (matchingVelX.length > 0) maxHeight = Math.max(allY[velY], maxHeight);
  });

console.log("Part 1:", maxHeight);

/* Part 2 */

let allVelocities = new Set();
Object.keys(allY).forEach((objY) => {
  const [velY, stepsY] = objY.split("|").map(Number);
  const matchingX = Object.keys(allX).filter((objX) => {
    const [velX, stepsX] = objX.split("|").map(Number);
    if (Math.abs(velX) <= stepsX) return stepsY >= stepsX;
    return stepsY === stepsX;
  });
  matchingX.forEach((objX) => {
    const [velX] = objX.split("|").map(Number);
    allVelocities.add(`${velX}|${velY}`);
  });
});

console.log("Part 2:", allVelocities.size);
