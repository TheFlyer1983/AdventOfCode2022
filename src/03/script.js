const { getData } = require('../utils');

const priorities = require('./constants');

const data = getData(__dirname);

function dayThree(data) {
  const duplicates = [];

  const inputArray = data.toString().split('\n');

  const rucksacks = inputArray.map((bag) => {
    const halfwayIndex = bag.length / 2;

    return [
      bag.slice(0, halfwayIndex).split(''),
      bag.slice(halfwayIndex).split('')
    ];
  });

  rucksacks.map((bag) => {
    let arrayIndex = 0;
    while (arrayIndex < bag[0].length) {
      const duplicateIndex = bag[1].findIndex(
        (i) => bag[0][[arrayIndex]] === i
      );

      if (duplicateIndex !== -1) {
        duplicates.push(bag[0][arrayIndex]);
        break;
      }
      arrayIndex++;
    }
  });

  let partOneTotal = 0;

  duplicates.map((item) => {
    partOneTotal = partOneTotal + priorities[item];
  });

  console.log(`Part One Total - ${partOneTotal}`);

  const groups = [];

  for (let i = 0; i < inputArray.length; i = i + 3) {
    groups.push([
      inputArray[i].split(''),
      inputArray[i + 1].split(''),
      inputArray[i + 2].split('')
    ]);
  }

  const badges = [];

  groups.map((group) => {
    let arrayIndex = 0;
    while (arrayIndex < group[0].length) {
      const groupOne = group[1].includes(group[0][arrayIndex]);
      const groupTwo = group[2].includes(group[0][arrayIndex]);

      if (groupOne && groupTwo) {
        badges.push(group[0][arrayIndex]);
        break;
      }

      arrayIndex++;
    }
  });

  let partTwoTotal = badges.reduce(
    (total, curr) => (total = total + priorities[curr]),
    0
  );

  console.log(`Part Two Total - ${partTwoTotal}`);
}

dayThree(data);
