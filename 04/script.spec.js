import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

describe('When `solutionOne` is called', () => {
  it('should return the correct data', () => {
    expect(solutionOne(data)).toEqual(2);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should return the correct data', () => {
    expect(solutionTwo(data)).toEqual(4);
  });
});
