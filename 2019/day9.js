function intComputer(extProgram, extInput) {
  let input = [...extInput];
  let program = [...extProgram];
  let output;
  let pointer = 0;
  let opCode = program[pointer];
  let step = 0;
  let relativebase = 0;
  while (opCode !== 99) {
    const isPosMode = program[pointer] > 100 ? false : true;
    const isRelMode = program[pointer] > 200 ? true : false;
    opCode = isPosMode
      ? program[pointer]
      : Number(program[pointer].toString().slice(-2));
    const params = isPosMode
      ? "000"
      : program[pointer]
          .toString()
          .slice(0, -2)
          .padStart(3, "0");
    const param1 =
      params[2] == 0
        ? program[pointer + 1]
        : params[2] == 1
        ? pointer + 1
        : relativebase + 1;
    const param2 = params[1] == 0 ? program[pointer + 2] : pointer + 2;
    const param3 = params[0] == 0 ? program[pointer + 3] : pointer + 3;
    switch (opCode) {
      case 1:
        program[param3] = program[param1] + program[param2];
        step = 4;
        break;
      case 2:
        program[param3] = program[param1] * program[param2];
        step = 4;
        break;
      case 3:
        program[param1] = input.pop();
        step = 2;
        break;
      case 4:
        output = program[param1];
        step = 2;
        break;
      case 5:
        pointer = program[param1] !== 0 ? program[param2] : pointer + 3;
        step = 0;
        break;
      case 6:
        pointer = program[param1] == 0 ? program[param2] : pointer + 3;
        step = 0;
        break;
      case 7:
        program[param3] = program[param1] < program[param2] ? 1 : 0;
        step = 4;
        break;
      case 8:
        program[param3] = program[param1] == program[param2] ? 1 : 0;
        step = 4;
        break;
      case 9:
        relativebase = program[param1];
        step = 2;
        break;
    }
    pointer = pointer + step;
    if (program[pointer] == 99) return output;
  }
}

var program = [
  109,
  1,
  204,
  -1,
  1001,
  100,
  1,
  100,
  1008,
  100,
  16,
  101,
  1006,
  101,
  0,
  99
];

console.log(intComputer(program, [0]));
