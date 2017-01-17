const mapIntegers = (arr) => arr.map(str => parseInt(str));

// counts living cells INCLUDING itself!!
const countLivingNeighbours = (arr, pos) => {
  let [x, y] = mapIntegers(pos.split(":"));
  return arr.filter(cell => {
    let [x2, y2] = mapIntegers(cell.split(":"));
    let sortX = [x, x2].sort((a, b) => b - a);
    let sortY = [y, y2].sort((a, b) => b - a);
    return sortX[0] - sortX[1] <= 1 && sortY[0] - sortY[1] <= 1;
  }).length;
}

const getPossibleNeighbours = cell => {
  const [y, x] = mapIntegers(cell.split(":"));
  return [-1, 0, 1].reduce((a, b) => {
    let next = Array(3).fill('').map((e, i) => `${y + b}:${x - 1 + i}`);
    return a.concat(next);
  }, [])
  .filter(e => e !== cell);
}

const getDeadFromArray = (arr, allLiving) => arr.filter(cell => allLiving.indexOf(cell) < 0);

const getAllDead = (livingCells) => livingCells.reduce((a, b) => {;
    let neighbours = getPossibleNeighbours(b);
    let deadNeighbours = getDeadFromArray(neighbours, livingCells);
    return a.concat(deadNeighbours);
  }, []);

const survivors = (arr) => arr.filter(cell => [2, 3].indexOf(countLivingNeighbours(arr, cell) - 1) > -1);

const reborn = (arr) => {
  // all dead cells surrounding all living cells
  const dead = getAllDead(arr);
  // dead cells filtered down to get unique cells only
  const uniqueCells = dead.reduce((a, b) => a.concat( a.indexOf(b) > -1 ? [] : b), []);
  return uniqueCells.filter(cell => dead.filter(c => c === cell).length === 3);
};

const getDimensions = (newLivingCells) => {
  if(newLivingCells.length === 0) return [3, 3];
  return [0, 1].map(n => newLivingCells.map(
    cell => parseInt(cell.split(":")[n]) + 1
  ).sort((a, b) => b - a)[0] + 3)
}

const adjustDimensions = arr => {
  const adjustY = arr.map(c => c.split(':')[0]).indexOf('0') > -1 ? 1 : 0;
  const adjustX = arr.map(c => c.split(':')[1]).indexOf('0') > -1 ? 1 : 0;

  return arr.map(c => {
    let [y, x] = mapIntegers(c.split(':'));
    return `${y + adjustY}:${x + adjustX}`;
  });
}

const iter = arr => {
  const result = adjustDimensions(survivors(arr).concat(reborn(arr))
  );
  visualize(result);
  return result;
}

const visualize = (arr) => {

  const [width0, height0] = getDimensions(arr, []);

  let blankBoard = Array(height0).fill(0)
    .map( _ => "-".repeat(width0).split('') );

  const board = arr.reduce((a, b) => {
      let [y, x] = mapIntegers(b.split(":"));
      let nextBoard = a.slice(0);
      nextBoard[y][x] = 'x';
      return nextBoard;
    }, blankBoard);

  console.log(board.map(row => row.join('')).join('\n'));
}

module.exports = {
  mapIntegers,
  countLivingNeighbours,
  getPossibleNeighbours,
  getDeadFromArray,
  survivors,
  reborn,
  getDimensions,
  iter,
  visualize,
  adjustDimensions,
  getAllDead
};
