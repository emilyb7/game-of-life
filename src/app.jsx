import React from 'react';
import store from './../main.js'
import Store from './reducers/index.js';
import Game from './components/game.jsx';
import Controls from './components/controls.jsx';



class App extends React.Component {
   render() {
      return (
        <div className="main">
          <div className="game">
           <Game
             value={this.props.value}
             onSelectCell={this.props.onSelectCell}
           />
          </div>
          <Controls
            value={this.props.value}
            onNext={this.props.onNext}
          />
       </div>
      );
   }
}

export default App;
