import React, { useState } from "react";

export default function useCards() {
  const [drawDeck, setDrawDeck] = useState([]);
  // const [cardsInHand, setCardsInHand] = useState([]);
  const VALUES = Array.from(Array(98).keys());

  const startGame = () => {
    /*-----Create and shuffle a new drawDeck----*/
    let cardsArr = VALUES.map((value) => {
      return new Cards(value + 2);
    });

    for (let i = cardsArr.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = cardsArr[newIndex];
      cardsArr[newIndex] = cardsArr[i];
      cardsArr[i] = oldValue;
    }

    setDrawDeck(cardsArr);
  };

  return {
    drawDeck,
    startGame,
  };
}

function Cards(value) {
  this.value = value;
}
