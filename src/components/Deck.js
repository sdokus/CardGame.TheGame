import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//create the values for each of the cards (2-99)
const VALUES = Array.from(Array(98).keys());
let gameStarted = false;

function TheGame() {
  const [drawDeck, setDrawDeck] = useState([]);
  const [cardsInHand, setCardsInHand] = useState([]);
  const [decrementingDeck1, setDecrementingDeck1] = useState([new Card(100)]);
  const [decrementingDeck2, setDecrementingDeck2] = useState([new Card(100)]);
  const [incrementingDeck1, setIncrementingDeck1] = useState([new Card(1)]);
  const [incrementingDeck2, setIncrementingDeck2] = useState([new Card(1)]);

  const startGame = () => {
    /*-----Create and shuffle a new drawDeck----*/
    gameStarted = true;
    let cardsArr = VALUES.map((value) => {
      return new Card(value + 2);
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
    if (gameStarted) {
      /*-----"Deal" 6 cards to the cardsInHand array----*/
      let cardsCurrentlyInHand = cardsInHand;

      while (cardsCurrentlyInHand.length < 6) {
        let topCard = drawDeck.shift();
        cardsCurrentlyInHand.push(topCard);
      }

      setCardsInHand([...cardsCurrentlyInHand]);
    } else {
      alert("Must start the game before dealing cards!");
    }
  };

  function handleOnDragEnd(result) {
    const { destination, source } = result;
    //if trying to drag to a non-droppable area, don't do anything:
    if (!destination) return;

    //if the dragged item is back where it started, don't do anything:
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }

    //if trying to drop a card into a deck
    if (destination.droppableId === "deck-slots") {
      result.combine = true;
      const currentCardsInHand = Array.from(cardsInHand);
      const [cardToAdd] = currentCardsInHand.splice(result.source.index, 1);

      console.log(cardToAdd);

      if (destination.index === 0) {
        setDecrementingDeck1([...decrementingDeck1, cardToAdd]);
        console.log(decrementingDeck1);
      } else if (destination.index === 1) {
        setDecrementingDeck2([...decrementingDeck2, cardToAdd]);
      } else if (destination.index === 2) {
        setIncrementingDeck1([...incrementingDeck1, cardToAdd]);
      } else if (destination.index === 3) {
        setIncrementingDeck2([...incrementingDeck2, cardToAdd]);
      }
    }

    //if you're just moving cards within your hand:
    const items = Array.from(cardsInHand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setCardsInHand(items);
    console.log(result);
  }

  return (
    <div className="main">
      <button onClick={startGame}>Start Game</button>
      <div className="deck draw-deck">Draw Deck: ({drawDeck.length})</div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="deck-slots"
          direction="horizontal"
          isCombineEnabled={true}
        >
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
                disableInteractiveElementBlocking={true}
              >
                {(provided) => (
                  <li
                    className="deck decrementing-deck"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Going Down:{" "}
                    {
                      decrementingDeck1[decrementingDeck1.length - 1].state
                        .value
                    }
                  </li>
                )}
              </Draggable>
              <Draggable
                key={"decrementingDeck2"}
                draggableId={"decrementingDeck2"}
                index={1}
                isDragDisabled={true}
              >
                {(provided) => (
                  <li
                    className="deck decrementing-deck"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Going Down: {decrementingDeck2[0].state.value}
                  </li>
                )}
              </Draggable>
              <Draggable
                key={"incrementingDeck1"}
                draggableId={"incrementingDeck1"}
                index={2}
                isDragDisabled={true}
              >
                {(provided) => (
                  <li
                    className="deck incrementing-deck"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Going Up: {incrementingDeck1[0].state.value}
                  </li>
                )}
              </Draggable>
              <Draggable
                key={"incrementingDeck2"}
                draggableId={"incrementingDeck2"}
                index={3}
                isDragDisabled={true}
              >
                {(provided) => (
                  <li
                    className="deck incrementing-deck"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    Going Up: {incrementingDeck2[0].state.value}
                  </li>
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

//class component Card:
class Card extends React.Component {
  constructor(value) {
    super();
    this.state = {
      value: value, //each card's value is a number 2-99
      selected: false,
    };
  }

  //the card's color is determined by it's value
  color() {
    if (this.state.value <= 100 && this.state.value >= 90) {
      return "card nineties";
    } else if (this.state.value <= 89 && this.state.value >= 80) {
      return "card eighties";
    } else if (this.state.value <= 79 && this.state.value >= 70) {
      return "card seventies";
    } else if (this.state.value <= 69 && this.state.value >= 60) {
      return "card sixties";
    } else if (this.state.value <= 59 && this.state.value >= 50) {
      return "card fifties";
    } else if (this.state.value <= 49 && this.state.value >= 40) {
      return "card forties";
    } else if (this.state.value <= 39 && this.state.value >= 30) {
      return "card thirties";
    } else if (this.state.value <= 29 && this.state.value >= 20) {
      return "card twenties";
    } else if (this.state.value <= 19 && this.state.value >= 10) {
      return "card teens";
    }
    return "card single-digit";
  }

  getJSX() {
    if (this.state.selected) {
      <div className={this.color()} id="selected " value={this.state.value}>
        {this.state.value}
      </div>;
    }

    return (
      <div className={this.color()} value={this.state.value}>
        {this.state.value}
      </div>
    );
  }

  render() {
    return (
      <div className="card" value={this.color()}>
        {this.state.value}
      </div>
    );
  }
}

export default TheGame;
