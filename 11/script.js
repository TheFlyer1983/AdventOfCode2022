const { getData, add, subtract, multiply, divide, product } = require('../utils');

const data = getData(__dirname);

const OP_TO_FN = {
  '+': add,
  _: subtract,
  '*': multiply,
  '/': divide
};

function parseInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim());
      const result = {};

      for (const line of lines) {
        if (line.startsWith('Starting items: ')) {
          const items = line
            .split('Starting items: ')[1]
            .split(', ')
            .map(Number);
          result.items = items;
        }

        if (line.startsWith('Operation: ')) {
          const [op, y] = line.split('Operation: new = old ')[1].split(' ');
          result.operation = { op, y };
        }

        if (line.startsWith('Test: ')) {
          const divisor = line.split(' ').at(-1);
          result.test = Number(divisor);
        }

        if (line.startsWith('If true: ')) {
          const idx = line.split(' ').at(-1);
          result.ifTrue = Number(idx);
        }

        if (line.startsWith('If false: ')) {
          const idx = line.split(' ').at(-1);
          result.ifFalse = Number(idx);
        }
      }

      return result;
    });
}

function createSimulation(input) {
  const monkeys = parseInput(input);
  const inspectionCounts = Array(monkeys.length).fill(0);

  return {
    getState: () => ({
      monkeys,
      inspectionCounts
    }),
    tick() {
      for (const [idx, monkey] of monkeys.entries()) {
        const { items, operation, test, ifTrue, ifFalse } = monkey;

        while (items.length) {
          let worry = items.shift();
          inspectionCounts[idx]++;

          const { op, y } = operation;
          const amount = y === 'old' ? worry : Number(y);
          worry = OP_TO_FN[op](worry, amount);

          worry = Math.floor(worry / 3);

          const testResult = Boolean(worry % test === 0);
          const monkeyIndex = testResult ? ifTrue : ifFalse;

          monkeys[monkeyIndex].items.push(worry);
        }
      }
    }
  };
}

function solutionOne(input) {
  const sim = createSimulation(input);

  for (let i = 0; i < 20; i++) {
    sim.tick();
  }

  const { inspectionCounts } = sim.getState();
  const [x, y] = inspectionCounts.sort((a, b) => b - a).slice(0, 2);

  return x * y;
}

const solution1 = solutionOne(data);
console.log(solution1);

function createSimulation2(input) {
  const monkeys = parseInput(input);
  const inspectionCounts = Array(monkeys.length).fill(0);

  const lowestCommonMultiple = product(monkeys.map((monkey) => monkey.test));

  return {
    getState: () => ({
      monkeys,
      inspectionCounts
    }),
    tick() {
      for (const [idx, monkey] of monkeys.entries()) {
        const { items, operation, test, ifTrue, ifFalse } = monkey;

        while (items.length) {
          inspectionCounts[idx]++;
          let worry = items.shift();

          const { op, y } = operation;
          const amount = y === 'old' ? worry : Number(y);
          worry = OP_TO_FN[op](worry, amount);

          worry %= lowestCommonMultiple;

          const testResult = Boolean(worry % test === 0);
          const monkeyIndex = testResult ? ifTrue : ifFalse;

          monkeys[monkeyIndex].items.push(worry);
        }
      }
    }
  };
}

function solutionTwo(input) {
  const sim = createSimulation2(input);

  for (let i = 0; i < 10000; i++) {
    sim.tick();
  }

  const { inspectionCounts } = sim.getState();
  const [x, y] = inspectionCounts.sort((a, b) => b - a).slice(0, 2);

  return x * y;
}

const solution2 = solutionTwo(data);
console.log(solution2);

module.exports = {
  solutionOne,
  solutionTwo
};
