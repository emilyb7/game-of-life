const { mapIntegers, countNeighbours, getPossibleNeighbours, getDead, survivors, reborn, getDimensions, iter, adjustDimensions } = require('./index.js');

const startingPoint = ["10:11", "10:12", "11:13", "11:14", "11:15"];

let next = startingPoint;
for (i = 0; i < 10; i++) {
  next = iter(next);
}

iter(startingPoint);
