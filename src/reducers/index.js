const defaultState = {
  iterations: 0,
  history: [],
  livingCells: [{x: 1, y: 2, gen: 0}, {x: 2, y: 3, gen: 1}, {x: 3, y: 1, gen: 0}, {x: 3, y: 2, gen: 0}, {x: 3, y: 3, gen: 0}],
  height: 10,
  width: 10
}

import { getY, getX } from './helpers.js';
import { iter, getDimensions } from './../iteration.js';

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_CELL':
      const cell = {x: getX(action.cell), y: getY(action.cell), gen: state.iterations};
      const isActive = state.livingCells.some(c => c.x === cell.x && c.y === cell.y);
      const livingCellsNew = !!(isActive) ?
        state.livingCells.filter(c => !(c.x === cell.x && c.y === cell.y)) :
        state.livingCells.concat([cell]);
      return Object.assign({}, state, {
        history: state.history.slice(0, 99).concat([state.livingCells]),
        livingCells: livingCellsNew
      })
    case 'NEXT_ITERATION':
      let cells = iter(state.livingCells, state.iterations + 1);
      return Object.assign({}, state, {
        iterations: state.iterations + 1,
        livingCells: cells,
        height: getDimensions(cells)[0],
        width: getDimensions(cells)[1],
        history: state.history.slice(0, 99).concat([state.livingCells]),
       })
    case 'BACK_STEP':
      return Object.assign({}, state, {
        livingCells: [].concat((state.history[state.history.length - 1]) || defaultState.livingCells),
        history: state.history.slice(0, state.history.length - 1)
      })
    default:
      return state
  }
}
