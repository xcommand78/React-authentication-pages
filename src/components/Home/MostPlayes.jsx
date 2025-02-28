import React from 'react';
import Gamecard from '../utils/Gamecard';
import { mostPlayed } from '../utils/games';


const MostPlayes = () => {
  return (
    <div className="most-played-container">
      <h2>Most Played Games</h2>
      <div className="game-cards">
        {mostPlayed.map((game, index) => (
          <Gamecard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MostPlayes;