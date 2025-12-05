// Card component - displays a card with a value (2-99 or 1/100 for deck starters).
function Card({ value }) {
  // The card's color is determined by its value.
  const getColorClass = () => {
    if (value <= 100 && value >= 90) {
      return "card nineties";
    } else if (value <= 89 && value >= 80) {
      return "card eighties";
    } else if (value <= 79 && value >= 70) {
      return "card seventies";
    } else if (value <= 69 && value >= 60) {
      return "card sixties";
    } else if (value <= 59 && value >= 50) {
      return "card fifties";
    } else if (value <= 49 && value >= 40) {
      return "card forties";
    } else if (value <= 39 && value >= 30) {
      return "card thirties";
    } else if (value <= 29 && value >= 20) {
      return "card twenties";
    } else if (value <= 19 && value >= 10) {
      return "card teens";
    }
    return "card single-digit";
  };

  return (
    <div className={`card ${getColorClass()}`}>
      {value}
    </div>
  );
}

export default Card;
