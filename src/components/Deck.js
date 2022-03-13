import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cards from "./Cards";
import useCards from "../hooks/useCards";
// import useDragNDrop from "../hooks/useDragNDrop";

function TheGame() {
  const {
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
  } = useCards();
  // const { handleOnDragEnd } = useDragNDrop();

  useEffect(() => {
    startGame();
  }, []);

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
