const fs = require("fs");

const inputStr = fs.readFileSync("input8.txt", { encoding: "utf-8" }).trim();

// const inputStr = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

// const inputStr = `acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf`;

const data = inputStr.split("\r\n");

const input = [];
const output = [];

data.forEach((line) => {
  const [_in, _out] = line.split(" | ");
  input.push(_in);
  output.push(_out);
});

const uniqueLengths = [2, 3, 4, 7];

const count = output.reduce((s, value) => {
  const digits = value.split(" ");
  s += digits.reduce((innerS, v) => {
    if (uniqueLengths.includes(v.length)) innerS += 1;
    return innerS;
  }, 0);
  return s;
}, 0);

console.log(count);

let res2 = 0;

input.forEach((line, i) => {
  const signals = line.split(" ").map((s) => [...s].sort().join(""));
  signals.sort((a, b) => a.length - b.length);
  const TOP_SEGMENT = signals[1].replace(signals[0], "");

  const LEFT_CENTER_SEGMENT = signals[2].replace(
    new RegExp(`[${signals[0]}]`, "g"),
    ""
  );

  const three = signals
    .filter(
      (s) =>
        s.length === 5 && s.includes(signals[0][0]) && s.includes(signals[0][1])
    )
    .join("");

  const five = signals
    .filter(
      (s) =>
        s.length === 5 &&
        s.includes(LEFT_CENTER_SEGMENT[0]) &&
        s.includes(LEFT_CENTER_SEGMENT[1])
    )
    .join("");

  const two = signals
    .filter((s) => s.length === 5 && s !== three && s !== five)
    .join("");

  const zero = signals
    .filter(
      (s) =>
        s.length === 6 &&
        !(
          s.includes(LEFT_CENTER_SEGMENT[0]) &&
          s.includes(LEFT_CENTER_SEGMENT[1])
        )
    )
    .join("");

  const six = signals
    .filter(
      (s) =>
        s.length === 6 &&
        !(s.includes(signals[0][0]) && s.includes(signals[0][1]))
    )
    .join("");

  const nine = signals
    .filter((s) => s.length === 6 && s !== zero && s !== six)
    .join("");

  const digits = {
    [zero]: 0,
    [signals[0]]: 1,
    [two]: 2,
    [three]: 3,
    [signals[2]]: 4,
    [five]: 5,
    [six]: 6,
    [signals[1]]: 7,
    [signals[9]]: 8,
    [nine]: 9,
  };
  const result = Number(
    output[i]
      .split(" ")
      .map((o) => digits[[...o].sort().join("")])
      .join("")
  );
  res2 += result;
});

console.log(res2);
