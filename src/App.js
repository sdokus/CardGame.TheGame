//https://thewebdev.info/2021/01/31/create-a-hi-low-card-game-with-react-and-javascript/
import React, { useEffect, useState } from "react";
import Deck from "./components/Deck";
import Instructions from "./components/Instructions";

export default function App() {
  return (
    <div className="App">
      <h1>The Game Clone</h1>

      <Instructions />
      <Deck />
    </div>
  );
}
