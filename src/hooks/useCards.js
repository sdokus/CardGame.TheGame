import { useState, useCallback, useRef } from "react";

// Helper function to create a card data object.
const createCard = (value) => ({ value });

export default function useCards() {
  const [drawDeck, setDrawDeck] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [decrementingDeck1, setDecrementingDeck1] = useState([createCard(100)]);
  const [decrementingDeck2, setDecrementingDeck2] = useState([createCard(100)]);
  const [incrementingDeck1, setIncrementingDeck1] = useState([createCard(1)]);
  const [incrementingDeck2, setIncrementingDeck2] = useState([createCard(1)]);
  const VALUES = Array.from(Array(98).keys());

  // Use refs to access current state values in callbacks.
  const drawDeckRef = useRef(drawDeck);
  const cardsInHandRef = useRef(cardsInHand);

  // Keep refs in sync with state.
  drawDeckRef.current = drawDeck;
  cardsInHandRef.current = cardsInHand;

  const startGame = useCallback(() => {
    // Create and shuffle a new drawDeck.
    const cardsArr = VALUES.map((value) => createCard(value + 2));

    // Fisher-Yates shuffle algorithm.
    for (let i = cardsArr.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = cardsArr[newIndex];
      cardsArr[newIndex] = cardsArr[i];
      cardsArr[i] = oldValue;
    }

    setDrawDeck(cardsArr);
  }, []);

  const dealCards = useCallback(() => {
    const currentHand = cardsInHandRef.current;
    const currentDeck = drawDeckRef.current;

    if (currentHand.length > 6) {
      alert("Must play at least two cards before re-dealing cards to hand");
      return;
    }

    const cardsToDeal = 8 - currentHand.length;
    const cardsToAdd = currentDeck.slice(0, cardsToDeal);
    const newHand = [...currentHand, ...cardsToAdd];
    const newDeck = currentDeck.slice(cardsToDeal);

    // Update both states.
    setCardsInHand(newHand);
    setDrawDeck(newDeck);
  }, []);

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
