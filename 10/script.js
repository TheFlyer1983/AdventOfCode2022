const { getData } = require('../utils');

const data = getData(__dirname);

function parseInput(input) {
  return input.trim().split('\n');
}

const CHARS_PER_ROW = 40;

function createSimulation() {
  let value = 1;
  const cycles = [];
  const pixels = [];

  const cycle = () => {
    const cycleIdx = cycles.length % CHARS_PER_ROW;

    const diff = value - cycleIdx;
    const char = Math.abs(diff) <= 1 ? '#' : '.';

    cycles.push(value);
    pixels.push(char);
  };

  return {
    getState: () => ({
      value,
      cycles,
      pixels
    }),
    tick: (command) => {
      if (command === 'noop') {
        cycle();
        return;
      }

      const amount = Number(command.split(' ')[1]);

      cycle();
      cycle();
      value += amount;
    }
  };
}

const CYCLE_INDEXES = [20, 60, 100, 140, 180, 220];

function solutionOne(input) {
  const lines = parseInput(input);
  const sim = createSimulation();

  for (const line of lines) {
    sim.tick(line);
  }

  const { cycles } = sim.getState();

  let result = 0;
  for (const idx of CYCLE_INDEXES) {
    result += idx * cycles[idx - 1];
  }

  return result;
}

const solution1 = solutionOne(data);
console.log(solution1);

function renderPixels(pixels) {
  return `
${pixels.slice(0, 40).join('')}
${pixels.slice(40, 80).join('')}
${pixels.slice(80, 120).join('')}
${pixels.slice(120, 160).join('')}
${pixels.slice(160, 200).join('')}
${pixels.slice(200).join('')}
`.trim();
}

function solutionTwo(input) {
  const lines = parseInput(input);
  const sim = createSimulation();

  for (const line of lines) {
    sim.tick(line);
  }

  const { pixels } = sim.getState();

  return renderPixels(pixels);
}

const solution2 = solutionTwo(data);
console.log(solution2);

module.exports = { solutionOne, solutionTwo };
