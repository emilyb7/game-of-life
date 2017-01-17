const getY = cell => {
  return parseInt(cell.match(/\d+/g)[0]);
}

const getX = cell => {
  return parseInt(cell.match(/\d+/g)[1]);
}

module.exports = {
  getY: getY,
  getX: getX
};
