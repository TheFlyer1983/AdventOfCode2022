const { getData } = require('../utils');

const data = getData(__dirname);

function getElfData(input) {
  return input
    .trim()
    .split('\n\n')
    .map((elf) => elf.split('\n').map(Number));
}

function solutionOne(input) {
  const elfData = getElfData(input);

  const elfTotals = elfData
    .map((elf) => {
      return elf.reduce((total, item) => {
        return (total = total + item);
      }, 0);
    })
    .sort((a, b) => b - a);

  // console.log(`The Highest total is ${elfTotals[0]} calories`); //72070
  return elfTotals[0];
}

function solutionTwo(input) {
  const elfData = getElfData(input);

  const elfTotals = elfData
    .map((elf) => {
      return elf.reduce((total, item) => {
        return (total = total + item);
      }, 0);
    })
    .sort((a, b) => b - a);

  const topThreeTotal = elfTotals
    .slice(0, 3)
    .reduce((total, item) => (total = total + item), 0);

  // console.log(`The combined total is ${topThreeTotal} calories`); //211805
  return topThreeTotal;
}

solutionOne(data);
solutionTwo(data);

module.exports = { solutionOne, solutionTwo, getElfData };
