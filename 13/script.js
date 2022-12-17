const { getData, sum, isNumber, toArray } = require('../utils');

const data = getData(__dirname);

function parseInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((pairs) => pairs.split('\n').map(JSON.parse));
}

function compareLists(left, right) {
  const cloneLeft = [...left];
  const cloneRight = [...right];

  while (cloneLeft.length && cloneRight.length) {
    const leftItem = cloneLeft.shift();
    const rightItem = cloneRight.shift();

    if (isNumber(leftItem) && isNumber(rightItem)) {
      if (leftItem < rightItem) return 'correct';
      if (leftItem > rightItem) return 'wrong';
      if (leftItem === rightItem) continue;
    }

    const result = compareLists(toArray(leftItem), toArray(rightItem));

    if (result) return result;
  }

  if (cloneRight.length && !cloneLeft.length) return 'correct';
  if (cloneLeft.length && !cloneRight.length) return 'wrong';
}

function solutionOne(input) {
  const pairs = parseInput(input);
  const indicies = [];

  for (const [idx, [left, right]] of pairs.entries()) {
    const result = compareLists(left, right);

    if (result === 'correct') {
      indicies.push(idx + 1);
    }
  }

  return sum(indicies);
}

const solution1 = solutionOne(data);
console.log(solution1);

function secondParseInput(input) {
  return input.trim().split('\n').filter(Boolean).map(JSON.parse);
}

const RESULT_TO_SORT_INT = {
  correct: -1,
  wrong: 1
};

function solutionTwo(input) {
  const lines = secondParseInput(input);

  const div1 = [[2]];
  const div2 = [[6]];
  const allLines = [...lines, div1, div2];

  const sorted = allLines.sort((a, b) => {
    const result = compareLists(a, b);

    return RESULT_TO_SORT_INT[result];
  });

  const div1Index = sorted.findIndex((x) => x === div1) + 1;
  const div2Index = sorted.findIndex((x) => x === div2) + 1;

  return div1Index * div2Index;
}

const solution2 = solutionTwo(data);
console.log(solution2);

module.exports = {
  solutionOne,
  solutionTwo
};
