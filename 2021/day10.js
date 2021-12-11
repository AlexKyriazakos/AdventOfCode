const fs = require("fs");

const inputStr = fs.readFileSync("input10.txt", { encoding: "utf-8" }).trim();

// const inputStr = `[({(<(())[]>[[{[]{<()<>>
//     [(()[<>])]({[<{<<[]>>(
//     {([(<{}[<>[]}>{[]{[(<()>
//     (((({<>}<{<{<>}{[]{[]{}
//     [[<[([]))<([[{}[[()]]]
//     [{[{({}]{}}([{[{{{}}([]
//     {<[[]]>}<{[{[{[]{()[[[]
//     [<(<(<(<{}))><([]([]()
//     <{([([[(<>()){}]>(<<{{
//     <{([{{}}[<[[[<>{}]]]>[]]`;

const data = inputStr.split(/\s+/);

const OPEN_CHARACTERS = ["[", "(", "{", "<"];
const CLOSE_CHARACTERS = ["]", ")", "}", ">"];
const SYNTAX_SCORE = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};
const AUTOCOMPLETE_SCORE = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function autoCompleteLine(remainingOpen) {
  const characters = remainingOpen.reverse().map((i) => CLOSE_CHARACTERS[i]);

  const score = characters.reduce((total, c) => {
    total *= 5;
    total += AUTOCOMPLETE_SCORE[c];
    return total;
  }, 0);

  return score;
}
function validateLine(line) {
  const open = [];

  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (OPEN_CHARACTERS.includes(c)) {
      open.push(OPEN_CHARACTERS.indexOf(c));
    } else if (CLOSE_CHARACTERS.includes(c)) {
      const closeIndex = CLOSE_CHARACTERS.indexOf(c);
      const lastOpen = open.slice(-1)[0];
      if (closeIndex !== lastOpen && i !== line.length - 1) {
        return [
          `Expected ${CLOSE_CHARACTERS[lastOpen]} but found ${CLOSE_CHARACTERS[closeIndex]} instead`,
          SYNTAX_SCORE[CLOSE_CHARACTERS[closeIndex]],
        ];
      } else {
        open.pop();
      }
    }
  }

  return ["ok", autoCompleteLine(open)];
}

let validationScore = 0;
const autoCompleteScores = [];
data.forEach((el, idx) => {
  const [message, score] = validateLine(el);
  if (message === "ok") {
    autoCompleteScores.push(score);
  } else {
    validationScore += score;
  }
  console.log(`Line ${idx}: `, message);
});

const middleAutocompleteScore = autoCompleteScores.sort((a, b) => a - b)[
  Math.floor(autoCompleteScores.length / 2)
];

console.log(validationScore);

console.log(middleAutocompleteScore);
