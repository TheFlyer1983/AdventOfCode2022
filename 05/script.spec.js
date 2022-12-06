import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

describe('When `solutionOne` is called', () => {
  it('should return the correct data', () => {
    expect(solutionOne(data)).toEqual('CMZ');
  });
});

describe('When `solutionTwo` is called', () => {
  it('should return the correct data', () => {
    expect(solutionTwo(data)).toEqual('MCD');
  });
});
