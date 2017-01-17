const getY = cell => {
  return parseInt(cell.match(/\d+/g)[0]);
}

const getX = cell => {
  return parseInt(cell.match(/\d+/g)[1]);
}

const hslColor = gen => {
  const c = gen * 10 % 360;
  return `hsla(${c}, 79%, 66%, 1)`;
}

module.exports = {
  getY: getY,
  getX: getX,
  hslColor: hslColor
};
