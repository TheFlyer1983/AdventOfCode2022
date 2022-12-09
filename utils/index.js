const fs = require('fs');
const path = require('path');

function getData(dir) {
  return fs.readFileSync(path.resolve(dir, './input.txt'), {
    encoding: 'utf-8'
  });
}

const add = (x, y) => x + y;

module.exports = {
  getData,
  add
}