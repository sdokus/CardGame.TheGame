import React, { useState } from "react";

function Instructions() {
  const [show, setShow] = useState(false);

  const toggleInstructions = () => {
    if (!show) {
      setShow(true);
      return;
    }
    setShow(false);
    return;
  };

  if (show) {
    return (
      <div className="instructions">
        <button onClick={toggleInstructions}>Show/Hide Instructions</button>

        <h1>How to Play </h1>

        <ul>
          <li>
            <strong>Overview:</strong> There are 98 cards in the Draw Deck with
            a value of 2 to 99 - your goal is to move them all from the deck and
            your hand onto the four piles that are either decending from 100 or
            ascending from 1. The number of cards remaining when you can no
            longer play a card is your final score. If you can get all the cards
            into the four piles, you won the game!!!
          </li>
          <li>
            <strong>Game Play:</strong> Add a card to one of the four piles by
            dragging it from your hand and dropping it to the left of the pile
            you wish to add it to. You must play at least two cards at a time
            onto any of the four piles - these cards much be lower than the
            previous card in the descending piles and higher than the previous
            card on the ascending piles. Once you have played at least 2 cards,
            click on the "Deal Cards" button to get your hand back up to 6
            cards.
          </li>
          <li>
            <strong>Additional Rule:</strong> You can play a card on the
            descending piles that has a value of exactly 10 more than the
            previous card, bumping that deck back up; you can also play a card
            on the ascending piles that has a value of exactly 10 less than the
            previous card, bumping that deck back down.{" "}
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className="instructions">
        <button onClick={toggleInstructions}>Show/Hide Instructions</button>
      </div>
    );
  }
}

export default Instructions;
