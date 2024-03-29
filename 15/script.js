const {
  getData,
  getManhattanDistance,
  createRange,
  getLineIntersection
} = require('../utils');

const data = getData(__dirname);

function parseInput(input) {
  const result = input
    .trim()
    .split('\n')
    .map((line) => {
      const [sensorPart, beaconPart] = line.trim().split(':');
      const [sensorXPart, sensorYPart] = sensorPart.trim().split(',');
      const [beaconXPart, beaconYPart] = beaconPart.trim().split(',');

      const sensorX = Number(sensorXPart.replace('Sensor at x=', ''));
      const sensorY = Number(sensorYPart.replace('y=', ''));
      const beaconX = Number(
        beaconXPart.replace('closest beacon is at x=', '')
      );
      const beaconY = Number(beaconYPart.replace('y=', ''));

      return {
        sensor: {
          x: sensorX,
          y: sensorY
        },
        beacon: {
          x: beaconX,
          y: beaconY
        }
      };
    });

  return result;
}

const makeKey = (x, y) => `${x},${y}`;

function getBeaconlessCountForY(items, y) {
  const sensors = new Set();
  const beacons = new Set();
  const beaconless = new Set();

  for (const item of items) {
    const { sensor, beacon } = item;

    if (sensor.y === y) sensors.add(makeKey(sensor.x, sensor.y));
    if (beacon.y === y) beacons.add(makeKey(beacon.x, beacon.y));

    const distance = getManhattanDistance(
      sensor.x,
      sensor.y,
      beacon.x,
      beacon.y
    );

    const xRange = createRange(sensor.x - distance, sensor.x + distance);
    const yRange = createRange(sensor.y - distance, sensor.y + distance);

    if (!yRange.includes(y)) continue;

    for (const x of xRange) {
      const _distance = getManhattanDistance(sensor.x, sensor.y, x, y);

      if (_distance > distance) continue;

      const key = makeKey(x, y);

      if (!sensors.has(key) && !beacons.has(key) && !beaconless.has(key)) {
        beaconless.add(key);
      }
    }
  }

  return beaconless.size;
}

function solutionOne(input, at) {
  const items = parseInput(input);
  return getBeaconlessCountForY(items, at);
}

const solution1 = solutionOne(data, 2000000);
console.log(solution1);

function findUndetectedBeacon(items, min, max) {
  const sensorWithDistances = [];
  const sensorBoundaries = [];

  for (const item of items) {
    const { sensor, beacon } = item;
    const distance = getManhattanDistance(
      sensor.x,
      sensor.y,
      beacon.x,
      beacon.y
    );

    sensorWithDistances.push({ sensor, distance });

    const boundary = distance + 1;

    const { x, y } = sensor;
    const top = [x, y - boundary];
    const right = [x + boundary, y];
    const bottom = [x, y + boundary];
    const left = [x - boundary, y];

    sensorBoundaries.push([
      [...top, ...right],
      [...right, ...bottom],
      [...bottom, ...left],
      [...left, ...top]
    ]);
  }

  const intersections = [];

  for (const boundary1 of sensorBoundaries) {
    for (const boundary2 of sensorBoundaries) {
      for (const line1 of boundary1) {
        for (const line2 of boundary2) {
          const intersection = getLineIntersection(line1, line2);

          if (!intersection) continue;

          intersections.push(intersection);
        }
      }
    }
  }

  let result;

  for (const intersection of intersections) {
    const { x, y } = intersection;

    if (x < min || x > max || y < min || y > max) continue;

    let detected = false;

    for (const { sensor, distance } of sensorWithDistances) {
      const intersectionDistance = getManhattanDistance(
        sensor.x,
        sensor.y,
        x,
        y
      );

      if (intersectionDistance <= distance) {
        detected = true;
        break;
      }
    }
    
    if (!detected) {
      result = { x, y };
      break;
    }
  }

  return result;
}

function solutionTwo(input, min, max) {
  const items = parseInput(input);
  const { x, y } = findUndetectedBeacon(items, min, max);

  return x * 4000000 + y;
}

const solution2 = solutionTwo(data, 0, 4000000);
console.log(solution2);

module.exports = {
  solutionOne,
  solutionTwo
};
