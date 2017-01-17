const test = require('tape');
const { mapIntegers, countLivingNeighbours, getPossibleNeighbours, getDeadFromArray, survivors, reborn, getDimensions, iter, adjustDimensions, getAllDead } = require('./index.js');
const helpers = require('./../src/reducers/helpers.js');

test("map integers returns an array of integers", (t) => {
  t.deepEqual(mapIntegers(["1", "0"]), [1, 0]);
  t.end();
});

test("countLivingNeighbours finds number of living neighbours of a given cell, including itself", (t) => {
  const livingCellsSimple = ["0:0", "1:1"];
  t.equal(countLivingNeighbours(livingCellsSimple, "0:1"), 2);
  t.equal(countLivingNeighbours(livingCellsSimple, "0:0"), 2);

  const livingCellsBigger = ["1:1", "2:2"];
  t.equal(countLivingNeighbours(livingCellsBigger, "1:1"), 2);

  const livingCellsLine = ["1:1", "1:2", "1:3", "1:4", "1:5"];
  t.equal(countLivingNeighbours(livingCellsLine, "1:2"), 3, "middle of a line");
  t.equal(countLivingNeighbours(livingCellsLine, "1:1"), 2, "end of a line");

  const livingCellsBlock = ["0:0", "0:1", "0:2", "1:0", "1:1", "1:2", "2:0", "2:1", "2:2"];
  t.equal(countLivingNeighbours(livingCellsBlock, "1:1"), 9, "middle of a block");
  t.equal(countLivingNeighbours(livingCellsBlock, "0:0"), 4, "corner of a block");
  t.end();
});

test("get coordinates of all cells next to a specific cell, also gets negative coordinates", (t) => {
  let result = ["0:0", "0:1", "0:2", "1:0", "1:2", "2:0", "2:1", "2:2"];
  t.equal(getPossibleNeighbours("2:2").length, 8);
  t.equal(getPossibleNeighbours("0:0").length, 8);
  t.deepEqual(getPossibleNeighbours("1:1"), result);
  t.end();
});

test("getDeadFromArray takes an array of cells and all known living cells and returns those from the first array that are dead", (t) => {
  const livingCells = ["1:1", "2:2"];
  const neighbours = ["0:0", "0:1", "0:2", "1:0", "1:2", "2:0", "2:1", "2:2"];
  t.equal(getDeadFromArray(neighbours, livingCells).length, 7);
  t.end();
});

test("survivors takes an array of living cells and returns a new array of those that survive", (t) => {

  const livingCells1 = ["1:1", , "2:1", "2:2"];
  t.equal(survivors(livingCells1).length, 3);

  const livingCellsCross = ["1:2", "2:1", "2:2", "2:3", "3:2"];
  const resultCross = ["1:2", "2:1", "2:3", "3:2"];
  t.deepEqual(survivors(livingCellsCross), resultCross);

  const livingCellsGlider = ["1:2", "2:3", "3:1", "3:2", "3:3"].sort();
  const resultGlider = ["2:3", "3:2", "3:3"];
  t.deepEqual

  t.end();
});

test("reborn takes an array of living cells and returns neighbouring dead cells that get born from them", (t) => {

  const livingCellsCorner = ["1:1", "2:1", "2:2"];
  t.equal(reborn(livingCellsCorner).length, 1);
  t.deepEqual(reborn(livingCellsCorner).sort(), ["1:2"], "corner formation makes new cell");

  const livingCellsLine3 = ["1:1", "1:2", "1:3"];
  t.equal(reborn(livingCellsLine3).length, 2);
  t.deepEqual(reborn(livingCellsLine3).sort(), ["0:2", "2:2"], "3 cells in a horizontal line make 2 new cells");

  const livingCellsLine4 = ["1:1", "2:1", "3:1", "4:1"];
  t.equal(reborn(livingCellsLine4).length, 4);
  t.deepEqual(reborn(livingCellsLine4).sort(), ["2:0", "3:0", "2:2", "3:2"].sort(), "4 cells in a vertical line make 2 new cells");

  t.end();
});

test("getAllDead takes an array of living cells and returns all neighbouring dead cells; instances of cells may be repeated", (t) => {
  const livingCells1 = ["1:1"];
  t.equal(getAllDead(livingCells1).length, 8);

  const livingCells2 = ["1:1", "1:2"];
  t.equal(getAllDead(livingCells2).length, 14);

  const livingCells2spaced = ["1:1", "1:3"];
  t.equal(getAllDead(livingCells2spaced).length, 16);
  t.end();
})


test("returns correct height and width for board", (t) => {
  const cells = ["1:2", "0:2", "2:2"];
  t.deepEqual(getDimensions(cells), [6, 6]);
  t.end();
})

test("returns a single array of all cells alive in next iteration", (t) => {
  const livingCells1 = ["1:1", "1:2", "1:3"];
  const result1 = ["1:2", "2:2", "3:2"];
  t.deepEqual(iter(livingCells1).sort(), result1);

  const livingCellsGlider = ["1:2", "2:3", "3:1", "3:2", "3:3"].sort();
  const resultGlider = ["2:1", "2:3", "3:2", "3:3", "4:2"];
  t.deepEqual(iter(livingCellsGlider).sort(), resultGlider, "correct result for glider constellation");
  t.end();
})

test("adjustDimensions keeps padding around the game", (t) => {
  const livingCells = ["0:2", "1:2", "2:2"];
  t.deepEqual(adjustDimensions(livingCells), ["1:2", "2:2", "3:2"], "add row of padding on top");

  const livingCellsLeft = ["1:0", "2:0", "3:0"];
  t.deepEqual(adjustDimensions(livingCellsLeft), ["1:1", "2:1", "3:1"], "add row of padding on left");
  t.end();
})

// helper functions from src
test("get y returns row number from string", (t) => {
  const cell = "cell_11:48";
  t.equal(helpers.getY(cell), 11);
  t.end();
});

test("get x returns column number from string", (t) => {
  const cell = "cell_11:48";
  t.equal(helpers.getX(cell), 48);
  t.end();
})
