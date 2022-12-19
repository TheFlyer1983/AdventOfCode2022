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
  createRange
};
