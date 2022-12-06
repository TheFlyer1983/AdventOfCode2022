const { getData } = require('../utils');

const data = getData(__dirname);

function solutionOne(data) {
  const inputArray = data
    .trim()
    .split('\n')
    .map((item) => item.split(','));

  const fullyOverlappingRanges = inputArray
    .map((pair) => {
      const range1 = pair.slice(0, 1)[0].split('-');
      const range2 = pair.slice(1)[0].split('-');

      if (
        (Number(range1[0]) >= Number(range2[0]) &&
          Number(range1[1]) <= Number(range2[1])) ||
        (Number(range2[0]) >= Number(range1[0]) &&
          Number(range2[1]) <= Number(range1[1]))
      ) {
        return [range1, range2];
      }
    })
    .filter((range) => range !== undefined);

  console.log(`Part One Total - ${fullyOverlappingRanges.length}`);
  return fullyOverlappingRanges.length;
}

function solutionTwo(data) {
  const inputArray = data
    .trim()
    .split('\n')
    .map((item) => item.split(','));

  const overlappingRanges = inputArray
    .map((pair) => {
      const range1 = pair.slice(0, 1)[0].split('-');
      const range2 = pair.slice(1)[0].split('-');

      if (
        (Number(range1[0]) >= Number(range2[0]) &&
          Number(range1[0]) <= Number(range2[1])) ||
        (Number(range2[0]) >= Number(range1[0]) &&
          Number(range2[0]) <= Number(range1[1]))
      ) {
        return [range1, range2];
      }
    })
    .filter((range) => range !== undefined);

  console.log(`Part Two Total - ${overlappingRanges.length}`);
  return overlappingRanges.length;
}

solutionOne(data);
solutionTwo(data);

module.exports = {
  solutionOne,
  solutionTwo
};
