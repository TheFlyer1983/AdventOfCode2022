import { describe, it, expect } from 'vitest';
const { solution } = require('./script');

const data = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;


describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solution(data, 4)).toEqual(7);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solution(data, 14)).toEqual(19);
  });
});

