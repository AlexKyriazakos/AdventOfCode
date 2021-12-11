const fs = require("fs");
const input = fs.readFileSync("input7.txt", "utf-8").split("\r\n");
const reg = new RegExp(/^(.*)\sbags\scontain\s(no\sother\sbags|\d+\s.*)\.$/);
const bags = input.reduce((obj, text) => {
  const res = text.match(reg);
  const bag = res[1];
  const contents =
    res[2] === "no other bags"
      ? []
      : res[2]
          .replace(/ bag(s)?/g, "")
          .replace(/\d\s/g, "")
          .split(",");
  obj[bag] = contents;
  return obj;
}, {});

const checkBagContents = (bag) => {
  console.log(bag);
  if (bags[bag].length === 0) return false;

  if (bags[bag].includes("shiny gold")) return true;

  if (bags[bag].some(checkBagContents)) return true;
  return false;
};

const firstKey = "bright turquoise";
console.log(firstKey, bags[firstKey], checkBagContents(firstKey));

// const res = Object.keys(bags).filter(checkBagContents);

// console.log(res);
