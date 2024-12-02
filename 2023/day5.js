const fs = require("fs");

function solve(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n\r?\n/g);

  const parsedData = [];

  for (let i = 0; i < data.length; i++) {
    const section = data[i];
    const [name, rest] = section.split(/\s?m?a?p?:\s?\r?\n?/);

    if (i === 0) {
      const values = rest.split(" ").map((v) => Number(v));
      parsedData.push({ name, values });
      continue;
    }

    const prevValues = parsedData[i - 1].values;

    const internalMap = rest
      .trim()
      .split(/\r?\n/g)
      .map((line) => {
        const [destinationStart, sourceStart, length] = line
          .split(" ")
          .map((v) => Number(v));
        return { sourceStart, destinationStart, length };
      });

    const values = prevValues.map((v) => {
      const foundRage = internalMap.find(
        ({ sourceStart, length }) =>
          v >= sourceStart && v < sourceStart + length
      );
      if (foundRage) {
        const { sourceStart, destinationStart } = foundRage;
        return destinationStart + (v - sourceStart);
      }
      return v;
    });

    parsedData.push({ name, values });
  }

  const minLocation = Math.min(...parsedData[parsedData.length - 1].values);

  return minLocation;
}

function solve2(inputPath) {
  const input = fs.readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split(/\r?\n\r?\n/g);

  const parsedData = [];

  for (let i = 0; i < data.length; i++) {
    const section = data[i];
    const [name, rest] = section.split(/\s?m?a?p?:\s?\r?\n?/);

    if (i === 0) {
      const values = rest
        .split(" ")
        .map((v) => Number(v))
        .reduce((res, v, idx, arr) => {
          if (idx % 2) {
            const start = arr[idx - 1];
            const end = start + v;
            res.push({ start, end });
          }
          return res;
        }, []);
      parsedData.push({ name, values });
      continue;
    }

    const prevValues = parsedData[i - 1].values;

    const internalMap = rest
      .trim()
      .split(/\r?\n/g)
      .map((line) => {
        const [destinationStart, sourceStart, length] = line
          .split(" ")
          .map((v) => Number(v));
        return { sourceStart, destinationStart, length };
      });

    const values = prevValues.reduce((res, { start, end }) => {
      console.log({ start, end });
      internalMap.forEach(({ sourceStart, length }) => {
        // Check if range overlaps
        if (start <= sourceStart + length && end >= sourceStart) {
          console.log({ sourceStart, sourceEnd: sourceStart + length });
          const newRangeStart = Math.max(start, sourceStart);
          const newRangeEnd = Math.min(end, sourceStart + length);
          res.push({ start: newRangeStart, end: newRangeEnd });

          const originalRangeLength = end - start;
          const newRangeLength = newRangeEnd - newRangeStart;

          if (originalRangeLength === newRangeLength) {
            // Range consumed all good
          } else {
            const leftLength = newRangeStart - start;
            const rightLength = end - newRangeEnd;
            if (leftLength > 0) {
              res.push({ start, end: start + leftLength - 1 });
            }
            if (rightLength > 0) {
              res.push({ start: end - rightLength + 1, end });
            }
          }
        }
      });
      return res;
    }, []);

    console.log({ values });

    parsedData.push({ name, values });
  }

  const minLocation = Math.min(...parsedData[parsedData.length - 1].values);

  return minLocation;
}

const demoResult = solve("day5-demo-input.txt");
console.log("Demo input result:", demoResult);

const demoResult2 = solve2("day5-demo-input.txt");
console.log("Demo input result 2:", demoResult2);

// const inputResult = solve("day5-input.txt");
// console.log("Result:", inputResult);
