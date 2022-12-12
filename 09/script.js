const { getData } = require('../utils');

const data = getData(__dirname);

function getHeadMovements(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [direction, amount] = line.split(' ');
      return [direction, Number(amount)];
    });
}

function getNextHeadPosition(headPos, movement) {
  const [x, y] = headPos;
  const [direction, amount] = movement;

  switch (direction) {
    case 'U':
      return [x, y + amount];
    case 'D':
      return [x, y - amount];
    case 'L':
      return [x - amount, y];
    case 'R':
      return [x + amount, y];
  }
}

function getNextTrailingKnotsPosition(trailPos, leadPos) {
  const [tx, ty] = trailPos;
  const [lx, ly] = leadPos;

  const xDiff = lx - tx;
  const yDiff = ly - ty;

  // Test if touching, no need to move
  if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return trailPos;

  const nextTx = tx + Math.sign(xDiff);
  const nextTy = ty + Math.sign(yDiff);

  return [nextTx, nextTy];
}

const SEPARATOR = '~~~';

function simulateRope(knots) {
  const knotPositions = Array(knots).fill([0, 0]);
  const tailLocations = new Set([knotPositions.at(-1).join(SEPARATOR)]);

  return {
    getState: () => {
      return { knotPositions, tailLocations };
    },
    tick(movement) {
      const [direction, amount] = movement;

      for (let i = 0; i < amount; i++) {
        for (const [index, knot] of knotPositions.entries()) {
          if (index === 0) {
            knotPositions[index] = getNextHeadPosition(knot, [direction, 1]);
            continue;
          }

          knotPositions[index] = getNextTrailingKnotsPosition(
            knot,
            knotPositions[index - 1]
          );
        }

        tailLocations.add(knotPositions.at(-1).join(SEPARATOR));
      }
    }
  };
}

function solutionOne(input) {
  const movements = getHeadMovements(input);

  const sim = simulateRope(2);

  for (const move of movements) {
    sim.tick(move);
  }

  return sim.getState().tailLocations.size;
}

const solution1 = solutionOne(data);
console.log({ solution1 });

function solutionTwo(input) {
  const movements = getHeadMovements(input);
  const sim = simulateRope(10);

  for (const move of movements) {
    sim.tick(move);
    console.log(sim.getState().tailLocations);
  }

  return sim.getState().tailLocations.size;
}

const solution2 = solutionTwo(data);
console.log({ solution2 });

module.exports = {
  solutionOne,
  solutionTwo
};
