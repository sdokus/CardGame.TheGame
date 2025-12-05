
function Instructions() {
  return (
    <div className="instructions">
      <button
        onClick={() =>
          alert(
            "Move all the cards from the draw deck into the four piles. Two of the piles are going down from 100 and two are going up from 1. You can bump a card back/forward if the value is exactly 10 less/more than the card currently on the top of that pile. You have to play at least two cards before redealing your hand back to 8 cards. Try to get as many cards as possible out of the draw deck to beat your best score!"
          )
        }
      >
        Instructions
      </button>
    </div>
  );
}

export default Instructions;
