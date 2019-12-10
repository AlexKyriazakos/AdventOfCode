const input = `134792-675810`;
const [min, max] = input.split("-");

function checkNumberAscending(num) {
  const str = num.toString();
  for (let i = 1; i < str.length; i++) {
    if (str[i] < str[i - 1]) return false;
  }
  return true;
}

function checkValidity(originalInput) {
  let input = originalInput.toString();
  // No duplicate
  const uniqueDigits = [...new Set(input)];
  if (uniqueDigits.length === input.length) {
    return false;
  }
  const onlyTwoTimes = uniqueDigits.filter(
    digit => [...input].filter(el => el === digit).length === 2
  );
  if (onlyTwoTimes.length < 1) return false;
  if (!checkNumberAscending(input)) {
    return false;
  }
  return true;
}
let count = 0;
for (let i = min; i < max; i++) {
  if (checkValidity(i)) count = count + 1;
}

console.log(count);
