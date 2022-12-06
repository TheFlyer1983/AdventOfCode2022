import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;


describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solutionOne(data)).toEqual(7);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solutionTwo(data)).toEqual(19);
  });
});

