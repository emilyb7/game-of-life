
// counts living cells INCLUDING itself!!
const countLivingNeighbours = (arr, pos) => {
  let [x, y] = [pos.x, pos.y];
  return arr.filter(cell => {
    let [x2, y2] = [cell.x, cell.y];
    let sortX = [x, x2].sort((a, b) => b - a);
    let sortY = [y, y2].sort((a, b) => b - a);
    return sortX[0] - sortX[1] <= 1 && sortY[0] - sortY[1] <= 1;
  }).length;
}

const getPossibleNeighbours = cell => {
  const [y_, x_] = [cell.y, cell.x];
  return [-1, 0, 1].reduce((a, b) => {
    let next = Array(3).fill('').map((e, i) => {
      return {
        y: (y_ + b),
        x: (x_ - 1 + i)
      }
    });
    return a.concat(next);
  }, [])
  .filter(e => !(e.x === x_ && e.y === y_ ));
}

const getDeadFromArray = (arr, allLiving) => arr.filter(cell => allLiving.filter(livingCell => {
  return cell.x === livingCell.x && cell.y == livingCell.y;
}).length === 0);

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
  const uniqueCells = dead.reduce((a, b) => a.concat( a.some(c => c.x === b.x && c.y === b.y) ? [] : [b]), []);
  return uniqueCells.filter(cell => dead.filter(c => c.x === cell.x && c.y === cell.y).length === 3);
};

const getDimensions = (newLivingCells) => {
  if(newLivingCells.length === 0) return [3, 3];
  return ["y", "x"].map(d => newLivingCells.map(
    cell => cell[d] + 1
  ).sort((a, b) => b - a)[0] + 3)
}

const adjustDimensions = arr => {
  const adjustY = arr.map(c => c.y).indexOf(0) > -1 ? 1 : 0;
  const adjustX = arr.map(c => c.x).indexOf(0) > -1 ? 1 : 0;

  return arr.map(c => {
    return { y: c.y + adjustY, x: c.x + adjustX, gen: c.gen };
  });
}

const iter = (arr, gen) => {
  const rebornGen = reborn(arr).map(cell => Object.assign({}, { gen: gen }, cell));
  return adjustDimensions(survivors(arr).concat(rebornGen));
}

module.exports = {
  countLivingNeighbours,
  getPossibleNeighbours,
  getDeadFromArray,
  survivors,
  reborn,
  getDimensions,
  iter,
  adjustDimensions,
  getAllDead
};
