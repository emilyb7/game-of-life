import React from 'react';
import store from './../main.js'
import Store from './reducers/index.js';
import Game from './game.jsx';


class App extends React.Component {
   render() {
      return (
        <div className="game">
         <Game
           value={this.props.value}
           onSelectCell={this.props.onSelectCell}
         />
       </div>
      );
   }
}

export default App;
