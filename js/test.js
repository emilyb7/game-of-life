const test = require('tape');
const { countLivingNeighbours, getPossibleNeighbours, getDeadFromArray, survivors, reborn, getDimensions, iter, adjustDimensions, getAllDead } = require('./index.js');
const helpers = require('./../src/reducers/helpers.js');

test("countLivingNeighbours finds number of living neighbours of a given cell, including itself", (t) => {
  const livingCellsSimple = [{x: 0, y: 0, gen: 0}, {x: 1, y: 1, gen: 0}];
  t.equal(countLivingNeighbours(livingCellsSimple, {x: 0, y: 1, gen: 0}), 2);
  t.equal(countLivingNeighbours(livingCellsSimple, {x: 0, y: 0, gen: 0}), 2);

  const livingCellsBigger = [{x: 1, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.equal(countLivingNeighbours(livingCellsBigger, {x: 1, y: 1, gen: 0}), 2);

  const livingCellsLine = [{x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 1, y: 3, gen: 0}, {x: 1, y: 4, gen: 0}, {x: 1, y: 5, gen: 0}];
  t.equal(countLivingNeighbours(livingCellsLine, {x: 1, y: 2, gen: 0}), 3, "middle of a line");
  t.equal(countLivingNeighbours(livingCellsLine, {x: 1, y: 1, gen: 0}), 2, "end of a line");

  const livingCellsBlock = [ {x: 0, y: 0, gen: 0}, {x: 0, y: 1, gen: 0}, {x: 0, y: 2, gen: 0}, {x: 1, y: 0, gen: 0}, {x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 2, y: 0, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 2, gen: 0} ];
  t.equal(countLivingNeighbours(livingCellsBlock, {x: 1, y: 1, gen: 0}), 9, "middle of a block");
  t.equal(countLivingNeighbours(livingCellsBlock, {x: 0, y: 0, gen: 0}), 4, "corner of a block");
  t.end();
});

test("getPossibleNeighbours gets coordinates of all cells next to a specific cell, also gets negative coordinates", (t) => {
  let result = [ {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 1, y: 0}, {x: 1, y: 2}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2} ];
  t.equal(getPossibleNeighbours({x: 2, y: 2}).length, 8);
  t.equal(getPossibleNeighbours({x: 0, y: 0}).length, 8);
  t.deepEqual(getPossibleNeighbours({x: 1, y: 1}).sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), result);
  t.end();
});

test("getDeadFromArray takes an array of cells and all known living cells and returns those from the first array that are dead", (t) => {
  const neighbours = [{x: 0, y: 0, gen: 0}, {x: 0, y: 1, gen: 0}, {x: 0, y: 2, gen: 0}, {x: 1, y: 0, gen: 0}, {x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 2, y: 0, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}];
  const livingCells = [{x: 1, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.equal(getDeadFromArray(neighbours, livingCells).length, 7);
  t.end();
});

test("survivors takes an array of living cells and returns a new array of those that survive", (t) => {

  const livingCells1 = [{x: 1, y: 1, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.equal(survivors(livingCells1).length, 3);

  const livingCellsCross = [{x: 1, y: 2, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}, {x: 2, y: 3, gen: 0}, {x: 3, y: 2, gen: 0}];
  const resultCross = [{x: 1, y: 2, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 3, gen: 0}, {x: 3, y: 2, gen: 0}];
  t.deepEqual(survivors(livingCellsCross), resultCross);

  const livingCellsGlider = [{x: 1, y: 2, gen: 0}, {x: 2, y: 3, gen: 0}, {x: 3, y: 1, gen: 0}, {x: 3, y: 2, gen: 0}, {x: 3, y: 3, gen: 0}].sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x);
  const resultGlider = [{x: 2, y: 3, gen: 0}, {x: 3, y: 2, gen: 0}, {x: 3, y: 3, gen: 0}];
  t.deepEqual(survivors(livingCellsGlider).sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), resultGlider)

  t.end();
});

test("reborn takes an array of living cells and returns neighbouring dead cells that get born from them", (t) => {

  const livingCellsCorner = [{x: 1, y: 1, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.equal(reborn(livingCellsCorner).length, 1);
  t.deepEqual(reborn(livingCellsCorner).sort(), [{x: 1, y: 2}], "corner formation makes new cell");

  const livingCellsLine3 = [{x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 1, y: 3, gen: 0}];
  t.equal(reborn(livingCellsLine3).length, 2);
  t.deepEqual(reborn(livingCellsLine3).sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), [{x: 0, y: 2}, {x: 2, y: 2}], "3 cells in a horizontal line make 2 new cells");

  const livingCellsLine4 = [{x: 1, y: 1, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 3, y: 1, gen: 0}, {x: 4, y: 1, gen: 0}];
  t.equal(reborn(livingCellsLine4).length, 4);
  t.deepEqual(reborn(livingCellsLine4).sort(), [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 2}, {x: 3, y: 2}].sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), "4 cells in a vertical line make 2 new cells");

  t.end();
});

test("getAllDead takes an array of living cells and returns all neighbouring dead cells; instances of cells may be repeated", (t) => {
  const livingCells1 = [{x: 1, y: 1, gen: 0}];
  t.equal(getAllDead(livingCells1).length, 8);

  const livingCells2 = [{x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}];
  t.equal(getAllDead(livingCells2).length, 14);

  const livingCells2spaced = [{x: 1, y: 1, gen: 0}, {x: 1, y: 3, gen: 0}];
  t.equal(getAllDead(livingCells2spaced).length, 16);
  t.end();
});


test("getDimensions returns correct height and width for board", (t) => {
  const cells = [{x: 1, y: 2, gen: 0}, {x: 0, y: 2, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.deepEqual(getDimensions(cells), [6, 6]);
  t.end();
})

test("iter returns a single array of all cells alive in next iteration", (t) => {
  const livingCells1 = [{x: 1, y: 1, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 1, y: 3, gen: 0}];
  const result1 = [{x: 1, y: 2, gen: 0}, {x: 2, y: 2, gen: 0}, {x: 3, y: 2, gen: 0}];
  t.deepEqual(iter(livingCells1, 0).sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), result1);


  const livingCellsGlider = [{x: 1, y: 2, gen: 0}, {x: 2, y: 3, gen: 1}, {x: 3, y: 1, gen: 0}, {x: 3, y: 2, gen: 0}, {x: 3, y: 3, gen: 0}].sort();
  const resultGlider = [{x: 2, y: 1, gen: 2}, {x: 2, y: 3, gen: 1}, {x: 3, y: 2, gen: 0}, {x: 3, y: 3, gen: 0}, {x: 4, y: 2, gen: 2}];
  t.deepEqual(iter(livingCellsGlider, 2).sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), resultGlider, "correct result for glider constellation");
  t.end();
})

test("adjustDimensions keeps padding around the game", (t) => {
  const livingCells = [{x: 0, y: 2, gen: 0}, {x: 1, y: 2, gen: 0}, {x: 2, y: 2, gen: 0}];
  t.deepEqual(adjustDimensions(livingCells), [{x: 1, y: 2, gen: 0}, {x: 2, y: 2, gen: 0}, {x: 3, y: 2, gen: 0}].sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), "add row of padding on top");

  const livingCellsLeft = [{x: 1, y: 0, gen: 0}, {x: 2, y: 0, gen: 0}, {x: 3, y: 0, gen: 0}];
  t.deepEqual(adjustDimensions(livingCellsLeft), [{x: 1, y: 1, gen: 0}, {x: 2, y: 1, gen: 0}, {x: 3, y: 1, gen: 0}].sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), "add row of padding on left");

  // test with gen
  const livingCellsGen = [{x: 1, y: 0, gen: 1}, {x: 2, y: 0, gen: 2}, {x: 3, y: 0, gen: 3}];
  t.deepEqual(adjustDimensions(livingCellsGen), [{x: 1, y: 1, gen: 1}, {x: 2, y: 1, gen: 2}, {x: 3, y: 1, gen: 3}].sort((a, b) => b.y < a.y).sort((a, b) => b.x < a.x), "add row of padding on left");

  t.end();
})
//
// // helper functions from src
// test("get y returns row number from string", (t) => {
//   const cell = "cell_11:48";
//   t.equal(helpers.getY(cell), 11);
//   t.end();
// });
//
// test("get x returns column number from string", (t) => {
//   const cell = "cell_11:48";
//   t.equal(helpers.getX(cell), 48);
//   t.end();
// })
