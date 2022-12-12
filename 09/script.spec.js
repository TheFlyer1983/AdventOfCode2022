import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

const data2 = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;

describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solutionOne(data)).toEqual(13);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solutionTwo(data)).toEqual(1);
    expect(solutionTwo(data2)).toEqual(36);
  });
});
