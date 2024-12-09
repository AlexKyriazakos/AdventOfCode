import { readFileSync } from "fs";

type DiskBlock = {
  id: number | null;
  length: number;
};

const parseInput = (inputPath: string) => {
  const input = readFileSync(inputPath, { encoding: "utf-8" }).trim();

  const data = input.split("").map(Number);

  return data;
};

const parseDisk = (input: number[]) => {
  let nextId = 0;
  return input
    .map((v, i) => {
      const isFile = i % 2 === 0;
      return { id: isFile ? nextId++ : null, length: v };
    })
    .filter((v) => v.length);
};

const dumpDisk = (disk: DiskBlock[]) =>
  disk
    .map((v) => "".padStart(v.length, v.id != null ? "" + v.id : "."))
    .join("");

const consolidateEmptySpace = (disk: DiskBlock[]) => {
  for (let i = disk.length - 2; i >= 0; i--) {
    const currentBlock = disk[i];
    const prevBlock = disk[i + 1];

    if (currentBlock.id == null && prevBlock.id == null) {
      currentBlock.length += prevBlock.length;
      disk.splice(i + 1, 1);
    }
  }
  return disk;
};

const calculateChecksum = (disk: DiskBlock[]) => {
  let index = 0;
  const checksum = disk.reduce((sum, v, i) => {
    if (v.id !== null) {
      let length = v.length;
      while (length > 0) {
        sum += index * v.id;
        index++;
        length--;
      }
    } else {
      index += v.length;
    }
    return sum;
  }, 0);

  return checksum;
};

function solve(inputPath: string) {
  const data = parseInput(inputPath);

  const disk = parseDisk(data);

  let lastBlockIndex = disk.findLastIndex((v) => v.id !== null);
  let firstEmptyIndex = disk.findIndex((v) => v.id === null);

  while (lastBlockIndex > firstEmptyIndex) {
    const [currentBlock] = disk.splice(lastBlockIndex, 1);

    while (currentBlock.length >= 0) {
      const emptyBlockIndex = disk.findIndex((v) => v.id === null);
      const emptyBlock = disk[emptyBlockIndex];

      if (emptyBlock.length === currentBlock.length) {
        disk.splice(emptyBlockIndex, 1, currentBlock);
        disk.push({ id: null, length: currentBlock.length });
        break;
      } else if (emptyBlock.length > currentBlock.length) {
        disk[emptyBlockIndex] = {
          ...emptyBlock,
          length: emptyBlock.length - currentBlock.length,
        };

        disk.splice(emptyBlockIndex, 0, currentBlock);

        disk.push({ id: null, length: currentBlock.length });

        break;
      }

      disk.splice(emptyBlockIndex, 1, {
        ...currentBlock,
        length: emptyBlock.length,
      });
      currentBlock.length -= emptyBlock.length;
      disk.push({ id: null, length: emptyBlock.length });
    }

    lastBlockIndex = disk.findLastIndex((v) => v.id !== null);
    firstEmptyIndex = disk.findIndex((v) => v.id === null);
  }

  return calculateChecksum(disk);
}

function solveTwo(inputPath: string) {
  const data = parseInput(inputPath);

  const disk = parseDisk(data);

  let lastBlockIndex = disk.findLastIndex((v) => v.id !== null);
  let firstEmptyIndex = disk.findIndex((v) => v.id === null);

  let blockId = disk[lastBlockIndex].id ?? 0;
  while (lastBlockIndex > firstEmptyIndex) {
    const currentBlock = disk[lastBlockIndex];

    const emptyBlockIndex = disk.findIndex(
      (v) => v.id === null && v.length >= currentBlock.length
    );

    if (emptyBlockIndex >= 0 && emptyBlockIndex <= lastBlockIndex) {
      disk.splice(lastBlockIndex, 1, { id: null, length: currentBlock.length });
      const emptyBlock = disk[emptyBlockIndex];
      if (emptyBlock.length === currentBlock.length) {
        disk.splice(emptyBlockIndex, 1, currentBlock);
      } else if (emptyBlock.length > currentBlock.length) {
        disk[emptyBlockIndex] = {
          ...emptyBlock,
          length: emptyBlock.length - currentBlock.length,
        };

        disk.splice(emptyBlockIndex, 0, currentBlock);
      }

      consolidateEmptySpace(disk);
    }

    blockId--;
    lastBlockIndex = disk.findLastIndex(
      (v) => v.id !== null && v.id <= blockId
    );
    firstEmptyIndex = disk.findIndex((v) => v.id === null);
  }

  return calculateChecksum(disk);
}

const demoResult = solve("day9-demo-input.txt");
console.log("Part 1 demo input result:", demoResult);

const inputResult = solve("day9-input.txt");
console.log("Part 1 result:", inputResult);

const demoResult2 = solveTwo("day9-demo-input.txt");
console.log("Part 2 demo input result:", demoResult2);

const inputResult2 = solveTwo("day9-input.txt");
console.log("Part 2 result:", inputResult2);
