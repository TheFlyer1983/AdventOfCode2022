const { getData } = require('../utils');

const data = getData(__dirname);

function createQueue() {
  const queue = [];

  return {
    enqueue(item) {
      queue.push(item);
    },
    dequeue() {
      return queue.shift();
    },
    isEmpty() {
      return queue.length === 0;
    },
    peek() {
      return queue[0];
    },
    print() {
      console.log(queue);
    }
  };
}

function parseInput(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
}

function createNode(key, meta) {
  const children = [];

  return {
    key,
    meta,
    children,
    addChild: (node) => {
      children.push(node);
    }
  };
}

function createGraph() {
  const nodes = [];

  const byKey = (key) => (node) => key === node.key;

  return {
    nodes,
    addNode(key, meta) {
      let node = nodes.find(byKey(key));

      if (node) return node;

      node = createNode(key, meta);
      nodes.push(node);
      return node;
    },

    addEdge(node1Key, node2Key) {
      const node1 = nodes.find(byKey(node1Key));
      const node2 = nodes.find(byKey(node2Key));

      if (!(node1 && node2)) return;

      node1.addChild(node2);
    }
  };
}

const CHARACTER_ORDER = 'SabcdefghijklmnopqrstuvwxyzE'.split('');

function gridToGraph(grid) {
  const graph = createGraph();

  function getCharValue(char) {
    return CHARACTER_ORDER.findIndex((x) => x === char);
  }

  function getNodeMeta(char) {
    return {
      char,
      value: getCharValue(char),
      start: char === 'S',
      end: char === 'E'
    };
  }

  function safeGridGet(rowIdx, colIdx) {
    try {
      return grid[rowIdx][colIdx];
    } catch (error) {
      return undefined;
    }
  }

  function getNodeKey(rowIdx, colIdx) {
    return `${rowIdx}-${colIdx}`;
  }

  function getNeighbourIndices(rowIdx, colIdx) {
    return [
      [rowIdx - 1, colIdx],
      [rowIdx, colIdx + 1],
      [rowIdx + 1, colIdx],
      [rowIdx, colIdx - 1]
    ];
  }

  for (const [rowIdx, row] of grid.entries()) {
    for (const [colIdx, char] of row.entries()) {
      const charValue = getCharValue(char);
      const nodeKey = getNodeKey(rowIdx, colIdx);
      const node = graph.addNode(nodeKey, getNodeMeta(char));

      const neighbourIndexes = getNeighbourIndices(rowIdx, colIdx);

      for (const [neighbourRowIdx, neighbourColIdx] of neighbourIndexes) {
        const neighbourChar = safeGridGet(neighbourRowIdx, neighbourColIdx);

        if (!neighbourChar) continue;

        const neighbourValue = getCharValue(neighbourChar);
        if (neighbourValue <= charValue + 1) {
          const neighbourKey = getNodeKey(neighbourRowIdx, neighbourColIdx);

          const neigbourNode = graph.addNode(
            neighbourKey,
            getNodeMeta(neighbourChar)
          );

          node.addChild(neigbourNode);
        }
      }
    }
  }

  return graph;
}

function djikstras(graph, startNode, endNode) {
  const distances = [];

  for (node of graph.nodes) {
    distances[node.key] = Infinity;
  }

  distances[startNode.key] = 0;

  const queue = createQueue();
  queue.enqueue(startNode);

  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    const nodeDistance = distances[node.key];

    if (node === endNode) break;

    for (const child of node.children) {
      const nextDistance = nodeDistance + 1;

      if (nextDistance < distances[child.key]) {
        distances[child.key] = nextDistance;
        queue.enqueue(child);
      }
    }
  }

  return distances[endNode.key];
}

function solutionOne(input) {
  const grid = parseInput(input);
  const graph = gridToGraph(grid);

  const startNode = graph.nodes.find((node) => node.meta.start);
  const endNode = graph.nodes.find((node) => node.meta.end);

  const result = djikstras(graph, startNode, endNode);

  return result;
}

const solution1 = solutionOne(data);
console.log(solution1);

function solutionTwo(input) {
  const grid = parseInput(input).map((row) =>
    row.map((char) => (char === 'S' ? 'a' : char))
  );

  const graph = gridToGraph(grid);

  const startNodes = graph.nodes.filter((node) => node.meta.char === 'a');
  const endNode = graph.nodes.find((node) => node.meta.end);

  const result = startNodes.map((startNode) =>
    djikstras(graph, startNode, endNode)
  );

  return Math.min(...result);
}

const solution2 = solutionTwo(data);
console.log(solution2);

module.exports = {
  solutionOne,
  solutionTwo
};
