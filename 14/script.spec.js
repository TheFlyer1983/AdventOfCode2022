import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`;

describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solutionOne(data)).toEqual(24);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solutionTwo(data)).toEqual(93);
  });
});
