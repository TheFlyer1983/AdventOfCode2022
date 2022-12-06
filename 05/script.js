const { getData } = require('../utils');

const data = getData(__dirname);

function createStack() {
  const stack = [];

  return {
    push(item) {
      stack.push(item);
    },
    pop() {
      return stack.pop();
    },
    isEmpty() {
      return stack.length === 0;
    },
    peek() {
      return stack[stack.length - 1];
    },
    print() {
      console.log(stack);
    }
  };
}

/*
  Returns an array of objects, with each object containing each instruction as a key/value pair.
*/
function parseMove(str) {
  const [quantity, from, to] = str
    .replace('move', '')
    .replace('from', '-')
    .replace('to', '-')
    .split('-')
    .map(Number);

  return { quantity, from, to };
}

function formatInput(data) {
  let [stacks, moves] = data.split('\n\n');

  stacks = stacks.split('\n').reverse().slice(1);

  /*
    Getting the number of stacks here. There is 35 characters in the row (with the `[`, `]` and spaces and the crate letters).
    So 35 / 4 = 8.75, so we round this up to the nearest whole number to get 9.
  */
  const cratesInRow = Math.ceil(stacks[0].length / 4);

  /*
    Creating an array with specific functions for each sub array. 
  */
  const stacksActual = Array(cratesInRow)
    .fill()
    .map(() => createStack());

  /*
    Here we loop through all the rows of the inputs and adds each item to an input row. If the loop encounters a space, then it then skips that and goes to the next letter (adding 4).
  */
  for (const row of stacks) {
    let stackIndex = 0;

    if (stackIndex < cratesInRow) {
      for (let crateIndex = 1; crateIndex < row.length - 1; crateIndex += 4) {
        const value = row[crateIndex].trim();

        if (value) {
          stacksActual[stackIndex].push(value);
        }

        stackIndex++;
      }
    }
  }

  moves = moves.trim().split('\n').map(parseMove);

  return { stacks: stacksActual, moves };
}

function solutionOne(data) {
  const { stacks, moves } = formatInput(data);

  for (const move of moves) {
    const { quantity, from, to } = move;
    const fromIndex = from - 1;
    const toIndex = to - 1;

    for (let i = 0; i < quantity; i++) {
      const item = stacks[fromIndex].pop();
      stacks[toIndex].push(item);
    }
  }

  const result = stacks.map((stack) => stack.peek()).join('');
  console.log(`Part One Result - ${result}`);
  return result;
}

function solutionTwo(data) {
  const { stacks, moves } = formatInput(data);

  const tempStack = createStack();

  for (const move of moves) {
    const { quantity, from, to } = move;
    const fromIndex = from - 1;
    const toIndex = to - 1;

    for (let i = 0; i < quantity; i++) {
      const item = stacks[fromIndex].pop();
      tempStack.push(item);
    }

    while (!tempStack.isEmpty()) {
      const item = tempStack.pop();
      stacks[toIndex].push(item);
    }
  }

  const result = stacks.map((stack) => stack.peek()).join('');
  console.log(`Part Two Result - ${result}`);
  return result
}

solutionOne(data);
solutionTwo(data);

module.exports = {
  solutionOne,
  solutionTwo
};
