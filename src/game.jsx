import React from 'react';

const Game = props => {
  console.log(props.value);
  const height = props.value.height;
  const width = props.value.width;

  const renderBoard = (height, width) => {

    const cols = row => Array(width)
      .fill('')
        .map((_, col) => <div
          className="cell"
          onClick={props.onSelectCell}
          key={`cell_${row}:${col}`}
          id={`cell_${row}:${col}`}
          style={{
            backgroundColor: props.value.livingCells.some(cell => cell.x === col && cell.y === row) ? 'turquoise' : 'default', cursor: 'pointer'
          }}
        ></div>);

    const rows = Array(height)
      .fill('')
        .map((_, row) => <div className="row" key={`row_${row}`}>{ cols(row) }</div>);

    return (
      <div className="board">{ rows }</div>
    );
  }

  return renderBoard(height, width);
}

export default Game;
