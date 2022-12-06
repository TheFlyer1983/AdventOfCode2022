import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo, getPairs } = require('./script');

const data = `
A Y
B X
C Z
`;

describe('When `getPairs` is called', () => {
  it('should return the correct data', () => {
    expect(getPairs(data)).toEqual([
      ['A', 'Y'],
      ['B', 'X'],
      ['C', 'Z']
    ]);
  });
});

describe('When `solutionOne` is called', () => {
  it(`should return the correct data`, () => {
    expect(solutionOne(data)).toEqual(15);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should return the correct data', () => {
    expect(solutionTwo(data)).toEqual(12);
  });
});
