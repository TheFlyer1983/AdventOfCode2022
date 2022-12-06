import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo, getElfData } = require('./script');

const data = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`;

describe('when `getElfData` is called', () => {
  it('should return the correct data', () => {
    expect(getElfData(data)).toEqual([
      [1000, 2000, 3000],
      [4000],
      [5000, 6000],
      [7000, 8000, 9000],
      [10000]
    ]);
  });
});

describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solutionOne(data)).toEqual(24000);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solutionTwo(data)).toEqual(45000);
  });
});
