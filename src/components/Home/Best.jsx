import React from 'react';
import Gamecard from '../utils/Gamecard';
import { bestTitles } from '../utils/games';
import Button from '../utils/Button';
import Image from '../utils/Image';
import nextbtn from '../../assets/img/right.png';
import prevtbtn from '../../assets/img/left.png';
import { useState } from 'react';

const Best = () => {
  const [firstValue, setFirstValue] = useState(0);
  const [lastValue, setLastValue] = useState(5);
  const [lastIndex, setLastIndex] = useState(false);
  const [firstIndex, setFirstIndex] = useState(true);

  const prev = () => {
    if (firstValue <= 0) {
      setFirstIndex(true); // Disable "Previous" button on the first page
      return;
    }

    const newFirstValue = Math.max(0, firstValue - 5);
    const newLastValue = newFirstValue + 5;

    setFirstValue(newFirstValue);
    setLastValue(newLastValue);
    setLastIndex(false); // Reset lastIndex when navigating back
    setFirstIndex(newFirstValue === 0); // Update firstIndex based on newFirstValue
  };

  const next = () => {
    if (lastValue >= bestTitles.length) {
      setLastIndex(true); // Disable "Next" button on the last page
      return;
    }

    const newFirstValue = firstValue + 5;
    const newLastValue = Math.min(bestTitles.length, newFirstValue + 5);

    setFirstValue(newFirstValue);
    setLastValue(newLastValue);
    setFirstIndex(false); // Reset firstIndex when navigating forward
    setLastIndex(newLastValue >= bestTitles.length); // Update lastIndex based on newLastValue
  };

  return (
    <div className="most-played-container">
        <h2>Our Best Titles</h2>
      <div className="btns">
        <Button className="sbtn" onClick={prev} disabled={firstIndex}>
          <Image src={prevtbtn} className="pagbtn" />
        </Button>
        <Button className="sbtn" onClick={next} disabled={lastIndex}>
          {lastIndex ? '' : <Image src={nextbtn} className="pagbtn" />}
        </Button>
      </div>

      <div className="game-cards">
        {bestTitles.slice(firstValue, lastValue).map((game, index) => (
          <Gamecard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Best;