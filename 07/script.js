const { getData, add } = require('../utils');

const data = getData(__dirname);

function traverse(node, visitFn, depth = 0) {
  visitFn(node, depth);

  node.children.forEach((child) => traverse(child, visitFn, depth + 1));
}

function createNode(key, meta, parentNode = null) {
  const children = [];

  const node = {
    key,
    children,
    meta,
    parentNode,
    addChild(childKey, childMeta) {
      const childNode = createNode(childKey, childMeta, node);
      children.push(childNode);
    },
    findChild(childKey) {
      return node.children.find((child) => child.key === childKey);
    }
  };

  return node;
}

function createTree(rootKey, meta) {
  const rootNode = createNode(rootKey, meta);

  return {
    rootNode,
    print() {
      let result = '';

      function addKeyToResult(node, depth) {
        const text = `${node.key} ${JSON.stringify(node.meta)}`;
        result +=
          result.length === 0 ? text : `\n${' '.repeat(depth * 2)}${text}`;
      }

      traverse(rootNode, addKeyToResult);

      console.log('Result', result);

      return result;
    }
  };
}

function parseInputIntoTree(input) {
  const tree = createTree('/', { type: 'dir' });
  const lines = input.trim().split('\n');

  let currentNode = tree.rootNode;
  let isListing = false;

  for (const line of lines) {
    try {
      if (line.startsWith('$ cd')) {
        isListing = false;
        const arg = line.substring(5);

        switch (arg) {
          case '/':
            currentNode = tree.rootNode;
            break;

          case '..':
            currentNode = currentNode.parentNode;
            break;

          default:
            currentNode = currentNode.findChild(arg);
        }

        continue;
      }

      if (line.startsWith('$ ls')) {
        isListing = true;
        continue;
      }

      if (isListing) {
        const [meta, key] = line.split(' ');

        switch (meta) {
          case 'dir':
            currentNode.addChild(key, { type: 'dir' });
            break;

          default:
            currentNode.addChild(key, {
              type: 'file',
              size: Number(meta)
            });
        }

        continue;
      }

      // Should never be hit
      console.log('unused', line);
    } catch (error) {
      console.log(currentNode, line);
      throw error;
    }
  }
  return tree;
}

function getTotalSize(node) {
  let result = 0;

  for (const child of node.children) {
    if (child.meta.type === 'file') {
      result += child.meta.size;
    }

    if (child.meta.type === 'dir') {
      result += getTotalSize(child);
    }
  }
  return result;
}

function useSizes() {
  const sizes = {};

  const visitor = (node) => {
    if (node.meta.type === 'dir') {
      const sizeKey = `${node.key}-${performance.now()}`;
      sizes[sizeKey] = getTotalSize(node);
    }
  };

  return { sizes, visitor };
}

function solutionOne(input) {
  const tree = parseInputIntoTree(input);
  const { sizes, visitor } = useSizes();

  traverse(tree.rootNode, visitor);

  const result = Object.values(sizes)
    .filter((value) => value <= 100000)
    .reduce(add, 0);

  return result;
}

const TOTAL_DISK_SPACE = 70000000;
const SPACE_FOR_UPDATE = 30000000;

function solutionTwo(input) {
  const tree = parseInputIntoTree(input);
  const { sizes, visitor } = useSizes();

  traverse(tree.rootNode, visitor);

  const totalSize = Object.values(sizes)[0];
  const minimalDeletionSize = SPACE_FOR_UPDATE - (TOTAL_DISK_SPACE - totalSize);

  const result = Math.min(...Object.values(sizes).filter(value => value >= minimalDeletionSize));
  return result;
}

console.log(solutionOne(data));
console.log(solutionTwo(data));

module.exports = {
  solutionOne,
  solutionTwo
};
