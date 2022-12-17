const fs = require('fs');
const path = require('path');

function getData(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8'
  });
}

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
  add,
  sum,
  subtract,
  multiply,
  product,
  divide,
  isNumber,
  toArray
};
