import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('When `solutionOne` is called', () => {
  it('should return the correct data', () => {
    expect(solutionOne(data)).toEqual(157)
  })
})

describe('When `solutionTwo` is called', () => {
  it('should return the correct data', () => {
    expect(solutionTwo(data)).toEqual(70);
  });
});