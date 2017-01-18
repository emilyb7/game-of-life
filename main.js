import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App.jsx';

import Store from './src/reducers/index.js';
import { createStore } from 'redux';
const store = createStore(Store);
const render = () => ReactDOM.render(<App store={store}/>, document.getElementById('app'));

render();

store.subscribe(render);
