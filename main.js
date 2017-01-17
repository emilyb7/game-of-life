import React from 'react';
import ReactDOM from 'react-dom';
//import App from './src/App.jsx';
import { createStore } from 'redux';


import Store from './src/reducers/index.js';

const store = createStore(Store);

const render = () => ReactDOM.render(<App
  value={ store.getState() }
  onSelectCell={ event => store.dispatch({ type: 'SELECT_CELL', cell: event.target.id }) }
  onNext={ () => store.dispatch({ type: 'NEXT_ITERATION' }) }
  onBack = { () => store.dispatch( {type: 'BACK_STEP'}) }
/>, document.getElementById('app'));

render();

store.subscribe(render);

export default store;
