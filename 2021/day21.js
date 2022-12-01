const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input21.txt", { encoding: "utf-8" })
  .trim();

// const inputStr = `Player 1 starting position: 4
// Player 2 starting position: 8`;

const [_, p1StartingPosition, __, p2StartingPosition] = inputStr
  .match(/(\d+)/g)
  .map(Number);

console.log(p1StartingPosition, p2StartingPosition);

let gameState = {
  p1: p1StartingPosition,
  p1Score: 0,
  p2: p2StartingPosition,
  p2Score: 0,
  activePlayer: "p1",
};
let i = 0;
let totalRolls = 0;
let playerRounds = 3;
while (true) {
  i++;
  totalRolls++;
  playerRounds--;
  if (i > 100) {
    i = 1;
  }
  const { activePlayer } = gameState;

  gameState[activePlayer] += i;

  if (gameState[activePlayer] > 10) {
    gameState[activePlayer] %= 10;
    gameState[activePlayer] = gameState[activePlayer] || 10;
  }
  // Swap active player and add the score
  if (playerRounds === 0) {
    gameState[`${activePlayer}Score`] += gameState[activePlayer];
    if (gameState[`${activePlayer}Score`] >= 1000) {
      console.log("WINNER in round", totalRolls);
      const losingPlayer = activePlayer === "p1" ? "p2" : "p1";
      const losingScore = gameState[`${losingPlayer}Score`];
      console.log("Part 1:", totalRolls * losingScore);
      break;
    }
    playerRounds = 3;
    gameState.activePlayer = activePlayer === "p1" ? "p2" : "p1";
  }
}
