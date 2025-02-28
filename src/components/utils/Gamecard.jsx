import React from 'react';
import Image from '../utils/Image';

const Gamecard = ({ game }) => {
  return (
    <div className="game-card">
      <div className="game-card-image">
        <Image src={game.img} alt={game.title} />
      </div>
      <div className="game-card-content">
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <div className="game-card-details">
          <span className="price">{game.price}</span>
          <span className="release">{game.release}</span>
        </div>
      </div>
    </div>
  );
};

export default Gamecard;