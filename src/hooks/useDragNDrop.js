import React from "react";
import useCards from "./useCards";

//come back to this... why is state not being recognized??

export default function useDragNDrop() {
  const {
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
  } = useCards();

  function handleOnDragEnd(result) {
    const { destination } = result;
    //if trying to drag to a non-droppable area, don't do anything:
    if (!destination) return;

    //if trying to drop a card into a deck:
    if (destination.droppableId === "deck-slots") {
      const currentCardsInHand = Array.from(cardsInHand);

      if (destination.index === 0) {
        //trying to add to decrementing deck 1
        const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);
        const currTopCard = decrementingDeck1[decrementingDeck1.length - 1];
        if (
          cardToAdd.state.value < currTopCard.state.value ||
          cardToAdd.state.value - currTopCard.state.value === 10
        ) {
          setCardsInHand(currentCardsInHand);
          setDecrementingDeck1([...decrementingDeck1, cardToAdd]);
          return;
        } else {
          alert(`Card needs to be lower than ${currTopCard.state.value}`);
        }
      } else if (destination.index === 1) {
        //trying to add to decrementing deck 2
        const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);
        const currTopCard = decrementingDeck2[decrementingDeck2.length - 1];
        if (
          cardToAdd.state.value < currTopCard.state.value ||
          cardToAdd.state.value - currTopCard.state.value === 10
        ) {
          setCardsInHand(currentCardsInHand);
          setDecrementingDeck2([...decrementingDeck2, cardToAdd]);
          return;
        } else {
          alert(`Card needs to be lower than ${currTopCard.state.value}`);
        }
      } else if (destination.index === 2) {
        //trying to add to incrementing deck 1
        const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);
        const currTopCard = incrementingDeck1[incrementingDeck1.length - 1];
        if (
          cardToAdd.state.value > currTopCard.state.value ||
          currTopCard.state.value - cardToAdd.state.value === 10
        ) {
          setCardsInHand(currentCardsInHand);
          setIncrementingDeck1([...incrementingDeck1, cardToAdd]);
          return;
        } else {
          alert(`Card needs to be higher than ${currTopCard.state.value}`);
        }
      } else if (destination.index === 3) {
        //trying to add to incrementing deck 2
        const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);
        const currTopCard = incrementingDeck2[incrementingDeck2.length - 1];
        if (
          cardToAdd.state.value > currTopCard.state.value ||
          currTopCard.state.value - cardToAdd.state.value === 10
        ) {
          setCardsInHand(currentCardsInHand);
          setIncrementingDeck2([...incrementingDeck2, cardToAdd]);
          return;
        } else {
          alert(`Card needs to be higher than ${currTopCard.state.value}`);
        }
      }
    }

    //if you're just moving cards within your hand:
    const items = Array.from(cardsInHand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(destination.index, 0, reorderedItem);
    setCardsInHand(items);
  }
  return { handleOnDragEnd };
}
