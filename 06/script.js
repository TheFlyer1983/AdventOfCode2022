const { getData } = require('../utils');

const data = getData(__dirname);

function solutionOne(input) {
  const inputArray = input.trim().split('');
  const tempArray = [];

  let index = 0;

  while (index < inputArray.length) {
    tempArray.push(inputArray[index]);

    if (tempArray.length >= 4) {
      const miniArray = tempArray.slice(tempArray.length - 4);
      const hasDuplicate = miniArray.some(
        (val, i) => miniArray.indexOf(val) !== i
      );

      if (!hasDuplicate) break;
    }

    index++;
  }

  return index + 1;

}
function solutionTwo(input) {
  const inputArray = input.trim().split('');
  const tempArray = [];

  let index = 0;

  while (index < inputArray.length) {
    tempArray.push(inputArray[index]);

    if (tempArray.length >= 14) {
      const miniArray = tempArray.slice(tempArray.length - 14);
      const hasDuplicate = miniArray.some(
        (val, i) => miniArray.indexOf(val) !== i
      );

      if (!hasDuplicate) break;
    }

    index++;
  }

  return index + 1;
}

console.log(solutionOne(data));
console.log(solutionTwo(data));

module.exports = { solutionOne, solutionTwo };
