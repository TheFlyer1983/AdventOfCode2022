const { getData } = require('../utils');

const data = getData(__dirname);

function makeGrid(input) {
  return input
    .trim()
    .split('\n')
    .map((row) => row.split('').map(Number));
}

function isTreeVisible(rowIdx, colIdx, grid) {
  const currentTree = grid[rowIdx][colIdx];

  const isEveryTreeShorter = (trees) =>
    trees.every((tree) => tree < currentTree);

  const treesToLeft = grid[rowIdx].slice(0, colIdx);
  const visibleFromLeft = isEveryTreeShorter(treesToLeft);

  const treesToRight = grid[rowIdx].slice(colIdx + 1);
  const visibleFromRight = isEveryTreeShorter(treesToRight);

  const treesToTheTop = grid.slice(0, rowIdx).map((row) => row[colIdx]);
  const visibleFromTop = isEveryTreeShorter(treesToTheTop);

  const treesToTheBottom = grid.slice(rowIdx + 1).map((row) => row[colIdx]);
  const visibleFromBottom = isEveryTreeShorter(treesToTheBottom);

  return (
    visibleFromLeft || visibleFromRight || visibleFromTop || visibleFromBottom
  );
}

function solutionOne(input) {
  const grid = makeGrid(input);

  let visibileCount = 0;

  for (let rowIndx = 0; rowIndx < grid.length; rowIndx++) {
    for (let colIndx = 0; colIndx < grid[0].length; colIndx++) {
      if (isTreeVisible(rowIndx, colIndx, grid)) {
        visibileCount++;
      }
    }
  }

  return visibileCount;
}

console.log(solutionOne(data));

function getScenicScoreForTree(rowIdx, colIdx, grid) {
  const currentTree = grid[rowIdx][colIdx];

  const getVisibleTreeCount = (trees) => {
    let result = 0;

    for (const tree of trees) {
      result++;
      if (tree < currentTree) continue;
      if (tree >= currentTree) break;
    }

    return result;
  };

  const treesToTheLeft = grid[rowIdx].slice(0, colIdx).reverse();
  const leftCount = getVisibleTreeCount(treesToTheLeft);

  const treesToTheRight = grid[rowIdx].slice(colIdx + 1);
  const rightCount = getVisibleTreeCount(treesToTheRight);

  const treesToTheTop = grid
    .slice(0, rowIdx)
    .map((row) => row[colIdx])
    .reverse();
  const topCount = getVisibleTreeCount(treesToTheTop);

  const treesToTheBottom = grid.slice(rowIdx + 1).map(row => row[colIdx]);
  const bottomCount = getVisibleTreeCount(treesToTheBottom)

  const result = leftCount * rightCount * topCount * bottomCount;

  return result;
}

function solutionTwo(input) {
  const grid = makeGrid(input);
  const scores = grid.map((row, rowIdx) =>
    row.map((_, colIdx) => getScenicScoreForTree(rowIdx, colIdx, grid))
  );

  return Math.max(...scores.flat());
}

console.log(solutionTwo(data));

module.exports = {
  solutionOne,
  solutionTwo
};
