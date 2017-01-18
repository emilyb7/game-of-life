import React from 'react';

const Details = props => {
  return (
    <div className="details">
      <h3>Conway's Game of Life</h3>
      <h4>A game with no players and just 4 rules</h4>
      <ul>
        <li>Any live cell with fewer than 2 live neighbours will die, as if caused by underpopulation</li>
        <li>Any live cell with 2 or 3 live neighbours will live on to the next generation</li>
        <li>Any live cell with more than 3 live neighbours will die, as if by overpopulation</li>
        <li>Any dead cell with exactly 3 live neighbours becomes a live cell, as if by reproduction</li>
      </ul>
      <a href="https://en.wikipedia.org/wiki/Conway's_Game_of_Life" target="blank">Read more on Wikipedia</a>
      <br />
      <br />
      <a href="https://github.com/emilyb7/game-of-life" target="blank">View this project's code on GitHub</a>
    </div>
  )
}

export default Details;
