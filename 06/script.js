const { getData } = require('../utils');

const data = getData(__dirname);

function solution(input, distinctChars) {
  const inputArray = input.trim().split('');
  const tempArray = [];

  let index = 0;

  while (index < inputArray.length) {
    tempArray.push(inputArray[index]);

    if (tempArray.length >= distinctChars) {
      const miniArray = tempArray.slice(tempArray.length - distinctChars);
      const hasDuplicate = miniArray.some(
        (val, i) => miniArray.indexOf(val) !== i
      );

      if (!hasDuplicate) break;
    }

    index++;
  }

  return index + 1;

}
console.log(solution(data, 4));
console.log(solution(data, 14));

module.exports = { solution };
