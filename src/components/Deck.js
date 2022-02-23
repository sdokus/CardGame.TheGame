import React from "react";

//create the values for each of the cards (2-99)
const VALUES = Array.from(Array(98).keys());

//class component drawDeck:
export default class drawDeck extends React.Component {
  constructor() {
    super();
    this.state = {
      drawDeck: [], //the drawDeck is an array of card objects
      cardsInHand: [],
      selectedCard: {},
      decrementingDeck1: [new Card(100)],
      decrementingDeck2: [new Card(100)],
      incrementingDeck1: [new Card(1)],
      incrementingDeck2: [new Card(1)],
    };
  }
  //when the page initially renders, set the state to the full drawPile
  componentDidMount() {
    /*-----Create and shuffle a new drawPile drawDeck----*/
    //create an array with cards with values 2-99
    let cardsArr = VALUES.map((value) => {
      return new Card(value + 2); //creates new Card instance for each value from the array of values 2-99
    });

    //shuffle that array
    for (let i = cardsArr.length - 1; i > 0; i--) {
      //get placement in drawDeck that is different than the current index:
      const newIndex = Math.floor(Math.random() * (i + 1));

      //swap the current index's value with the randomly generated index:
      const oldValue = cardsArr[newIndex];
      cardsArr[newIndex] = cardsArr[i];
      cardsArr[i] = oldValue;
    }

    //set the drawDeck state to be the shuffled cards array
    this.setState({
      drawDeck: cardsArr,
    });
  }

  dealCards() {
    /*-----"Deal" 6 cards to the cardsInHand array----*/
    let cardsToAddToHand = [];
    while (cardsToAddToHand.length < 6) {
      let topCard = this.state.drawDeck.shift();
      cardsToAddToHand.push(topCard);
    }
    this.setState({
      cardsInHand: [...this.state.cardsInHand, ...cardsToAddToHand],
    });
  }
  selectCard(e) {
    let cardValue = ~~e.target.innerText;
    let selectCard = this.state.cardsInHand.filter(
      (card) => card.state.value === cardValue
    )[0];
    console.log(selectCard);
    selectCard.state.selected = true;
    this.setState({
      selectedCard: selectCard,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="main">
        <div className="deck draw-deck">
          Draw Deck: {this.state.drawDeck.length}
        </div>
        {/* <div className="deck">
          Decreasing Deck: {this.state.decrementingDeck1[0]}
        </div> */}
        <button onClick={() => this.dealCards()}>Deal Cards</button>
        <div className="cards-in-hand">
          {this.state.cardsInHand.map((card, i) => {
            return (
              <div key={i} onClick={(e) => this.selectCard(e)}>
                {card.getJSX()}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
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
