import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Instructions from './components/Instructions';
import Deck from './components/Deck';

test('renders the game title', () => {
  render(<App />);
  const titleElement = screen.getByText(/the game clone/i);
  expect(titleElement).toBeInTheDocument();
});

test('instructions button shows alert when clicked', async () => {
  // Mock window.alert.
  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  render(<Instructions />);
  const instructionsButton = screen.getByRole('button', { name: /instructions/i });
  expect(instructionsButton).toBeInTheDocument();

  // Click the button to trigger the alert.
  await userEvent.click(instructionsButton);

  // Verify that alert was called with the instructions text.
  expect(alertSpy).toHaveBeenCalledWith(
    expect.stringContaining('Move all the cards from the draw deck')
  );

  alertSpy.mockRestore();
});

test('there is one draw deck with 98 cards to start', async () => {
  render(<Deck />);

  // Wait for the game to initialize (useEffect runs startGame).
  await waitFor(() => {
    const drawDeckElement = screen.getByText(/draw deck:/i);
    expect(drawDeckElement).toHaveTextContent('Draw Deck: (98)');
  });
});

test('there are two incrementing decks and two decrementing decks', () => {
  render(<Deck />);

  // Check for decrementing decks - they start at 100.
  const goingDownText = screen.getByText(/going down:/i);
  expect(goingDownText).toBeInTheDocument();

  // Find all deck elements with class "decrementing-deck".
  const decrementingDeckElements = document.querySelectorAll('.decrementing-deck');
  expect(decrementingDeckElements.length).toBe(2);

  // Verify they show 100.
  decrementingDeckElements.forEach(deck => {
    expect(deck.textContent).toBe('100');
  });

  // Check for incrementing decks - they start at 1.
  const goingUpText = screen.getByText(/going up:/i);
  expect(goingUpText).toBeInTheDocument();

  // Find all deck elements with class "incrementing-deck".
  const incrementingDeckElements = document.querySelectorAll('.incrementing-deck');
  expect(incrementingDeckElements.length).toBe(2);

  // Verify they show 1.
  incrementingDeckElements.forEach(deck => {
    expect(deck.textContent).toBe('1');
  });
});

test('clicking on the "Deal Cards" button leads to cards being added to the user\'s hand', async () => {
  render(<Deck />);

  // Wait for game initialization.
  await waitFor(() => {
    expect(screen.getByText(/draw deck:/i)).toBeInTheDocument();
  });

  const dealButton = screen.getByRole('button', { name: /deal cards/i });
  expect(dealButton).toBeInTheDocument();

  // Initially, cards-in-hand should be empty.
  const cardsInHandContainer = document.querySelector('.cards-in-hand');
  expect(cardsInHandContainer).toBeInTheDocument();
  const initialCardCount = cardsInHandContainer.querySelectorAll('li').length;
  expect(initialCardCount).toBe(0);

  // Click the deal button.
  await userEvent.click(dealButton);

  // After clicking, cards should be added to the hand.
  // dealCards adds cards until hand has 8 cards (if hand length <= 6).
  await waitFor(() => {
    const cardsInHand = document.querySelector('.cards-in-hand');
    const cardItems = cardsInHand.querySelectorAll('li');
    expect(cardItems.length).toBeGreaterThan(0);
  }, { timeout: 3000 });
});
