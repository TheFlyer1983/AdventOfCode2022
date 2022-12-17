import { describe, it, expect } from 'vitest';
const { solutionOne, solutionTwo } = require('./script');

const data = `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

describe('When `solutionOne` is called', () => {
  it('should output the correct total', () => {
    expect(solutionOne(data)).toEqual(13);
  });
});

describe('When `solutionTwo` is called', () => {
  it('should output the correct total', () => {
    expect(solutionTwo(data)).toEqual(140);
  });
});
