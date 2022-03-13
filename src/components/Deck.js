import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cards from "./Cards";

//create the values for each of the cards (2-99)
const VALUES = Array.from(Array(98).keys());

function TheGame() {
  const [drawDeck, setDrawDeck] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [decrementingDeck1, setDecrementingDeck1] = useState([new Cards(100)]);
  const [decrementingDeck2, setDecrementingDeck2] = useState([new Cards(100)]);
  const [incrementingDeck1, setIncrementingDeck1] = useState([new Cards(1)]);
  const [incrementingDeck2, setIncrementingDeck2] = useState([new Cards(1)]);

  useEffect(() => {
    startGame();
  }, []);

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
    setCardsInHand([]);
    setDecrementingDeck1([new Cards(100)]);
    setDecrementingDeck2([new Cards(100)]);
    setIncrementingDeck1([new Cards(1)]);
    setIncrementingDeck2([new Cards(1)]);
  };

  const dealCards = () => {
    /*-----"Deal" 8 cards to the cardsInHand array----*/
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

  function handleOnDragEnd(result) {
    const { destination } = result;
    //if trying to drag to a non-droppable area, don't do anything:
    if (!destination) return;

    //if trying to drop a card into a deck:
    if (destination.droppableId === "deck-slots") {
      const currentCardsInHand = Array.from(cardsInHand);
      // const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);
      // setCardsInHand(currentCardsInHand);

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

  return (
    <div className="main">
      <div className="deck draw-deck">Draw Deck: ({drawDeck.length})</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="deck-slots" direction="horizontal">
          {(provided) => (
            <ul
              className="deck-slots"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Draggable
                key={"decrementingDeck1"}
                draggableId={"decrementingDeck1"}
                index={0}
                isDragDisabled={true}
              >
                {(provided) => (
                  <div>
                    <h3>Going Down: </h3>
                    <li
                      className="deck decrementing-deck"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        decrementingDeck1[decrementingDeck1.length - 1].state
                          .value
                      }
                    </li>
                  </div>
                )}
              </Draggable>
              <Draggable
                key={"decrementingDeck2"}
                draggableId={"decrementingDeck2"}
                index={1}
                isDragDisabled={true}
              >
                {(provided) => (
                  <div>
                    <h3> ↓ </h3>
                    <li
                      className="deck decrementing-deck"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        decrementingDeck2[decrementingDeck2.length - 1].state
                          .value
                      }
                    </li>
                  </div>
                )}
              </Draggable>
              <Draggable
                key={"incrementingDeck1"}
                draggableId={"incrementingDeck1"}
                index={2}
                isDragDisabled={true}
              >
                {(provided) => (
                  <div>
                    <h3> Going Up:</h3>
                    <li
                      className="deck incrementing-deck"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        incrementingDeck1[incrementingDeck1.length - 1].state
                          .value
                      }
                    </li>
                  </div>
                )}
              </Draggable>
              <Draggable
                key={"incrementingDeck2"}
                draggableId={"incrementingDeck2"}
                index={3}
                isDragDisabled={true}
              >
                {(provided) => (
                  <div>
                    <h3>↑</h3>
                    <li
                      className="deck incrementing-deck"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {
                        incrementingDeck2[incrementingDeck2.length - 1].state
                          .value
                      }
                    </li>
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <button onClick={dealCards}>Deal Cards</button>

        <Droppable droppableId="cards-in-hand" direction="horizontal">
          {(provided) => (
            <ul
              className="cards-in-hand"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cardsInHand.map((card, i) => {
                return (
                  <Draggable
                    key={card.state.value.toString()}
                    draggableId={card.state.value.toString()}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {card.getJSX()}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TheGame;
