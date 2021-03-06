import React from 'react';
import Store from './reducers/index.js';
import Game from './components/game.jsx';
import Controls from './components/controls.jsx';
import Details from './components/details.jsx';
import { createStore } from 'redux';

class App extends React.Component {
   render() {
     const store = this.props.store;
      return (
        <div className="main">
          <div className="game">
           <Game
             value={ store.getState() }
             onSelectCell={ event => store.dispatch({ type: 'SELECT_CELL', cell: event.target.id }) }
           />
          </div>
          <Controls
            value={ store.getState() }
            onNext={ () => store.dispatch({ type: 'NEXT_ITERATION' }) }
            onBack = { () => store.dispatch( {type: 'BACK_STEP'}) }
          />
        <Details />
       </div>
      );
    }
}




export default App;
