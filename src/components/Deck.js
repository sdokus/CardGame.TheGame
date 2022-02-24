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
    if (!result.destination) return;
    const items = Array.from(cardsInHand);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCardsInHand(items);
  }

  return (
    <div className="main">
      <button onClick={startGame}>Start Game</button>
      <div className="deck draw-deck">Draw Deck: ({drawDeck.length})</div>

      <ul className="deck-slots">
        <li className="deck decrementing-deck">
          Going Down: {decrementingDeck1[0].state.value}
        </li>

        <li className="deck decrementing-deck">
          Going Down: {decrementingDeck2[0].state.value}
        </li>

        <li className="deck incrementing-deck">
          Going Up: {incrementingDeck1[0].state.value}
        </li>

        <li className="deck incrementing-deck">
          Going Up: {incrementingDeck2[0].state.value}
        </li>
      </ul>
      <button onClick={dealCards}>Deal Cards</button>

      <DragDropContext onDragEnd={handleOnDragEnd}>
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
