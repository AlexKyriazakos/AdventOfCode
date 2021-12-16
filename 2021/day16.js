const fs = require("fs");

const inputStr = fs
  .readFileSync(__dirname + "/input16.txt", { encoding: "utf-8" })
  .trim();

const hex2bin = (data) =>
  data
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");

const bin2Int = (data) => parseInt(data, 2);

const DEBUG = false;

const readPacket = (file, pointer = 0, depth = 0) => {
  let result;
  const packetVersion = file.slice(pointer, (pointer += 3));
  const packetTypeId = file.slice(pointer, (pointer += 3));

  versionSum += bin2Int(packetVersion);
  const log = (...args) => DEBUG && console.log("-".repeat(depth), ...args);

  log(packetVersion, packetTypeId);
  if (packetTypeId !== "100") {
    /* OPERATOR PACKET */
    const lengthTypeId = file.slice(pointer, (pointer += 1));

    const innerResult = [];

    if (lengthTypeId === "0") {
      const subPacketLength = bin2Int(file.slice(pointer, (pointer += 15)));
      log("Subpacket length:", subPacketLength);
      const endPointer = pointer + subPacketLength;
      log("END IS:", endPointer);
      while (pointer < endPointer) {
        [pointer, res] = readPacket(file, pointer, depth + 1);
        innerResult.push(res);
      }
    } else {
      let numOfPackets = bin2Int(file.slice(pointer, (pointer += 11)));
      log("Sub-packets:", numOfPackets);
      while (numOfPackets > 0) {
        [pointer, res] = readPacket(file, pointer, depth + 1);
        innerResult.push(res);
        numOfPackets--;
      }
    }
    switch (packetTypeId) {
      case "000":
        result = innerResult.reduce((s, v) => (s += v), 0);
        break;
      case "001":
        result = innerResult.reduce((p, v) => (p *= v), 1);
        break;
      case "010":
        result = Math.min(...innerResult);
        break;
      case "011":
        result = Math.max(...innerResult);
        break;
      case "101":
        result = innerResult[0] > innerResult[1] ? 1 : 0;
        break;
      case "110":
        result = innerResult[0] < innerResult[1] ? 1 : 0;
        break;
      case "111":
        result = innerResult[0] === innerResult[1] ? 1 : 0;
        break;
    }
  } else {
    /* READ LITERAL VALUE */
    let end = false;
    const res = [];
    while (!end) {
      const number = file.slice(pointer, (pointer += 5));
      res.push(number.slice(1));
      if (number[0] === "0") end = true;
    }
    result = bin2Int(res.join(""));
    log("Number:", result);
  }
  log("Result:", result);
  return [pointer, result];
};

let versionSum = 0;
let result;

/* DEMO INPUTS */
/*
[_, result] = readPacket(hex2bin("C200B40A82"));
console.log(result);

[_, result] = readPacket(hex2bin("04005AC33890"));
console.log(result);

[_, result] = readPacket(hex2bin("880086C3E88112"));
console.log(result);

[_, result] = readPacket(hex2bin("CE00C43D881120"));
console.log(result);

[_, result] = readPacket(hex2bin("D8005AC2A8F0"));
console.log(result);

[_, result] = readPacket(hex2bin("F600BC2D8F"));
console.log(result);

[_, result] = readPacket(hex2bin("9C005AC2F8F0"));
console.log(result);

[_, result] = readPacket(hex2bin("9C0141080250320F1802104A08"));
console.log(result);
*/

[_, result] = readPacket(hex2bin(inputStr));
console.log("Part 1:", versionSum);
console.log("Part 2:", result);
