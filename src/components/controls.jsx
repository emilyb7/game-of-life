import React from 'react';

const Controls = props => {

  return (
    <div className="controls">
      <p className="helperText">Click the board above to choose new cells, or click "Next" to play</p>
      <div className="container_buttons">
        <button className="controls_back">Back</button>
        <button className="controls_next" onClick={props.onNext}>Next</button>
      </div>
    </div>
  )
}

export default Controls;
