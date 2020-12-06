const fs = require("fs");
const input = fs
  .readFileSync("input4.txt", "utf-8")
  .split("\r\n\r\n")
  .map((passport) => passport.replace(/\r\n/g, " "));

const validPassportReg = new RegExp(
  /(eyr:)|(byr:)|(iyr:)|(hgt:)|(hcl:)|(ecl:)|(pid:)/g
);

const validPassports = input.filter(
  (el) => el.match(validPassportReg).length === 7
);

console.log(`Part 1: ${validPassports.length} validated passports`);

const inRange = (input, min, max) => {
  const value = Number(input);
  return value >= min && value <= max;
};

const validatePassport = (input) => {
  const [key, value] = input.split(":");

  switch (key) {
    case "byr":
      return inRange(value, 1920, 2002);
    case "eyr":
      return inRange(value, 2020, 2030);
    case "iyr":
      return inRange(value, 2010, 2020);
    case "hgt":
      return value.endsWith("cm")
        ? inRange(value.slice(0, -2), 150, 193)
        : inRange(value.slice(0, -2), 59, 76);
    case "pid":
      return value.length === 9;
    default:
      return true;
  }
};

const strictValidPassportReg = new RegExp(
  /(eyr:\d+)|(byr:\d+)|(iyr:\d+)|(hgt:\d+[cm|in]+)|(hcl:#[a-f0-9]+)|(ecl:(amb|blu|brn|gry|grn|hzl|oth))|(pid:\d+)/g
);
const strictValidPassports = validPassports.map((el) =>
  el.match(strictValidPassportReg)
);

const filtered = strictValidPassports.filter(
  (el) => el.length === 7 && el.every(validatePassport)
);
console.log(`Part 2: ${filtered.length} strictly validated passports`);
