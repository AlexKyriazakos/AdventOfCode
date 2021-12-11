const fs = require("fs");
const [rangesRaw, myTicketRaw, ticketsRaw] = fs
  .readFileSync("input16.txt", "utf-8")
  .split("\r\n\r\n");

const inRange = (value, range) => {
  return value >= range[0] && value <= range[1];
};

const originalRanges = rangesRaw.split("\r\n").map((line) => {
  const lineObj = {
    description: line.match(/^(.*):/)[0],
    values: line.match(/\d+-\d+/g).map((pair) => pair.split("-").map(Number)),
  };
  return lineObj;
});

const ranges = [...originalRanges];

const myTicket = myTicketRaw.split("\r\n")[1].split(",").map(Number);

const tickets = ticketsRaw
  .split("\r\n")
  .slice(1)
  .map((line) => line.split(",").map(Number));

const valueRanges = ranges.map((obj) => obj.values).flat();
const ticketsResult = tickets.map((ticket) => {
  return ticket.filter(
    (value) => !valueRanges.some((range) => inRange(value, range))
  );
});

const ticketErrorRate = ticketsResult.reduce(
  (sum, cv) => sum + cv.reduce((innerSum, val) => innerSum + val, 0),
  0
);

console.log(ticketErrorRate);

const validTickets = tickets.filter((ticket) =>
  ticket.every((value) =>
    valueRanges.some((range) => value >= range[0] && value <= range[1])
  )
);

let result = {};
while (Object.keys(result).length < ranges.length) {
  let resValues = [];
  for (let i = 0; i < validTickets[0].length; i++) {
    const values = validTickets.map((el) => el[i]);
    const res = ranges
      .map((obj) => obj.values)
      .map((lineRange) => {
        return (
          lineRange.length > 0 &&
          values.every(
            (value) =>
              inRange(value, lineRange[0]) || inRange(value, lineRange[1])
          )
        );
      });
    resValues.push(res);
  }
  const valueIndex = resValues.findIndex(
    (res) => res.filter(Boolean).length === 1
  );
  const rangeIndex = resValues[valueIndex].indexOf(true);
  console.log(valueIndex, rangeIndex, resValues[valueIndex]);
  ranges[rangeIndex] = [];
  result[valueIndex] = rangeIndex;
}

console.log(
  Object.entries(result)
    .filter(([key, value]) => value <= 5)
    .reduce((total, cv) => {
      console.log(cv, myTicket[cv[0]]);
      total *= myTicket[cv[0]];
      return total;
    }, 1)
);
