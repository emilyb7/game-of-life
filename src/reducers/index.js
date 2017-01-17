const defaultState = {
  iterations: 0,
  livingCells: [],
  height: 30,
  width: 75
}

import { getY, getX } from './helpers.js';

export default (state = defaultState, action) => {
  switch (action.type) {
    // case 'INCREMENT':
    //   return Object.assign({}, state, {
    //     iterations: state.iterations + 1,
    //     width: state.width + 1,
    //     height: state.height + 1
    //   })
    case 'SELECT_CELL':
      return Object.assign({}, state, {
        livingCells: state.livingCells.concat([{
          y: getY(action.cell),
          x: getX(action.cell),
          generation: state.iterations
        }])
      })
    default:
      return state
  }
}
