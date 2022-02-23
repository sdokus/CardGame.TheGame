//https://thewebdev.info/2021/01/31/create-a-hi-low-card-game-with-react-and-javascript/
import React, { useEffect, useState } from "react";
// import CardInHand from
import Deck from "./components/Deck";

//global variables to toggle depending on game status
let inRound, stopGame;

export default function App() {
  //game logic here

  return (
    <div className="App">
      <h1>The Game</h1>
      <Deck />
    </div>
  );
}
