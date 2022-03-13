import React from "react";

class Cards extends React.Component {
  constructor(value) {
    super();
    this.state = {
      value: value, //each card's value is a number 2-99
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
export default Cards;
