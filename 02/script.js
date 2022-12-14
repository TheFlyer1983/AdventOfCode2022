const { getData } = require('../utils');

const data = getData(__dirname);
console.log(data);

function getPairs(data) {
  return data
    .trim()
    .split('\n')
    .map((go) => go.split(' '));
}

function solutionOne(data) {
  const inputArray = getPairs(data);
  let totalPartOne = 0;

  inputArray.map((attempt) => {
    if (attempt[0] === 'A') {
      if (attempt[1] === 'X') {
        totalPartOne = totalPartOne + 1 + 3; //draw
      } else if (attempt[1] === 'Y') {
        totalPartOne = totalPartOne + 2 + 6; //win
      } else if (attempt[1] === 'Z') {
        totalPartOne = totalPartOne + 3 + 0; //lose
      }
    } else if (attempt[0] === 'B') {
      if (attempt[1] === 'X') {
        totalPartOne = totalPartOne + 1 + 0; //lose
      } else if (attempt[1] === 'Y') {
        totalPartOne = totalPartOne + 2 + 3; //draw
      } else if (attempt[1] === 'Z') {
        totalPartOne = totalPartOne + 3 + 6; //win
      }
    } else if (attempt[0] === 'C') {
      if (attempt[1] === 'X') {
        totalPartOne = totalPartOne + 1 + 6; //win
      } else if (attempt[1] === 'Y') {
        totalPartOne = totalPartOne + 2 + 0; // lose
      } else if (attempt[1] === 'Z') {
        totalPartOne = totalPartOne + 3 + 3; // draw
      }
    }
  });

  console.log(`Part One Total ${totalPartOne}`);
  return totalPartOne;
}

function solutionTwo(data) {
  const inputArray = getPairs(data);

  let totalPartTwo = 0;

  inputArray.map((attempt) => {
    if (attempt[0] === 'A') {
      //Rock
      if (attempt[1] === 'X') {
        //lose - Scissors
        totalPartTwo = totalPartTwo + 0 + 3;
      } else if (attempt[1] === 'Y') {
        //draw - Rock
        totalPartTwo = totalPartTwo + 3 + 1;
      } else if (attempt[1] === 'Z') {
        //win - Paper
        totalPartTwo = totalPartTwo + 6 + 2;
      }
    } else if (attempt[0] === 'B') {
      // Paper
      if (attempt[1] === 'X') {
        //lose - Rock
        totalPartTwo = totalPartTwo + 0 + 1;
      } else if (attempt[1] === 'Y') {
        //draw - Paper
        totalPartTwo = totalPartTwo + 3 + 2;
      } else if (attempt[1] === 'Z') {
        //win - Scissors
        totalPartTwo = totalPartTwo + 6 + 3;
      }
    } else if (attempt[0] === 'C') {
      // Scissors
      if (attempt[1] === 'X') {
        totalPartTwo = totalPartTwo + 0 + 2; //lose - Paper
      } else if (attempt[1] === 'Y') {
        totalPartTwo = totalPartTwo + 3 + 3; // draw - Scissors
      } else if (attempt[1] === 'Z') {
        totalPartTwo = totalPartTwo + 6 + 1; // win - Rock
      }
    }
  });

  console.log(`Part Two Total ${totalPartTwo}`);
  return totalPartTwo;
}

solutionOne(data);
solutionTwo(data);

module.exports = {
  solutionOne,
  solutionTwo,
  getPairs
};
