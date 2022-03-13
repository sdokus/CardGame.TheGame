import React, { useState } from "react";
import Cards from "../components/Cards";

export default function useCards() {
  const [drawDeck, setDrawDeck] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [decrementingDeck1, setDecrementingDeck1] = useState([new Cards(100)]);
  const [decrementingDeck2, setDecrementingDeck2] = useState([new Cards(100)]);
  const [incrementingDeck1, setIncrementingDeck1] = useState([new Cards(1)]);
  const [incrementingDeck2, setIncrementingDeck2] = useState([new Cards(1)]);
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

  const dealCards = () => {
    /*-----"Deal" 6 cards to the cardsInHand array----*/
    let cardsCurrentlyInHand = cardsInHand;

    if (cardsCurrentlyInHand.length <= 6) {
      while (cardsCurrentlyInHand.length < 8) {
        let topCard = drawDeck.shift();
        cardsCurrentlyInHand.push(topCard);
      }

      setCardsInHand([...cardsCurrentlyInHand]);
      return;
    }

    alert("Must play at least two cards before re-dealing cards to hand");
  };

  return {
    drawDeck,
    cardsInHand,
    setCardsInHand,
    incrementingDeck1,
    setIncrementingDeck1,
    decrementingDeck1,
    setDecrementingDeck1,
    incrementingDeck2,
    setIncrementingDeck2,
    decrementingDeck2,
    setDecrementingDeck2,
    startGame,
    dealCards,
  };
}

// //Constructor function for Cards:
// function Card (value) {
//   this.value = value;
// }
