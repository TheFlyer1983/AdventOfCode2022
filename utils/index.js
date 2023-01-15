const fs = require('fs');
const path = require('path');

function getData(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8'
  });
}

const inc = (x) => x + 1;
const dec = (x) => x - 1;
const lessThanOrEqualTo = (x, y) => x <= y;
const greaterThanOrEqualTo = (x, y) => x >= y;

function createRange(from, to) {
  const result = [];

  let change = inc;
  let comparison = lessThanOrEqualTo;

  const diff = to - from;

  if (Math.sign(diff) === -1) {
    change = dec;
    comparison = greaterThanOrEqualTo;
  }

  let i;
  for (i = from; comparison(i, to); i = change(i)) {
    result.push(i);
  }

  return result;
}

const safeGridGet = (grid, rowIdx, colIdx) => grid[rowIdx]?.[colIdx];

const add = (x, y) => x + y;

const sum = (nums) => nums.reduce(add);

const subtract = (x, y) => x - y;

const multiply = (x, y) => x * y;

const product = (nums) => nums.reduce(multiply);

const divide = (x, y) => x / y;

const isNumber = (x) => typeof x === 'number';

const toArray = (x) => (Array.isArray(x) ? x : [x]);

const getManhattanDistance = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

function getLineIntersection(line1, line2) {
  const [x1, y1, x2, y2] = line1;
  const [x3, y3, x4, y4] = line2;

  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return;

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  if (denominator === 0) return;

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return;

  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return { x, y };
}

module.exports = {
  getData,
  safeGridGet,
  add,
  sum,
  subtract,
  multiply,
  product,
  divide,
  isNumber,
  toArray,
  createRange,
  getManhattanDistance,
  getLineIntersection
};
