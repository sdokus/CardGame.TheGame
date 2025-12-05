import { useEffect, useCallback, useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Cards";
import useCards from "../hooks/useCards";

// Sortable card component for cards in hand.
function SortableCard({ card, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card value={card.value} />
    </li>
  );
}

// Droppable deck slot component.
function DeckSlot({ deck, label, index, type }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `deck-slot-${index}`,
  });

  const topCard = deck[deck.length - 1];

  return (
    <div>
      <h3>{label}</h3>
      <li
        className={`deck ${type}-deck`}
        ref={setNodeRef}
        style={{
          backgroundColor: isOver ? "rgba(0, 255, 0, 0.2)" : "transparent",
        }}
      >
        {topCard.value}
      </li>
    </div>
  );
}

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

  // Use refs to access current state values in callbacks.
  const cardsInHandRef = useRef(cardsInHand);
  const decrementingDeck1Ref = useRef(decrementingDeck1);
  const decrementingDeck2Ref = useRef(decrementingDeck2);
  const incrementingDeck1Ref = useRef(incrementingDeck1);
  const incrementingDeck2Ref = useRef(incrementingDeck2);

  // Keep refs in sync with state.
  cardsInHandRef.current = cardsInHand;
  decrementingDeck1Ref.current = decrementingDeck1;
  decrementingDeck2Ref.current = decrementingDeck2;
  incrementingDeck1Ref.current = incrementingDeck1;
  incrementingDeck2Ref.current = incrementingDeck2;

  // Set up sensors for drag and drop.
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over) return;

      const activeIdStr = active.id.toString();
      const overIdStr = over.id.toString();

      // Check if dragging from cards-in-hand.
      const cardIndex = cardsInHandRef.current.findIndex(
        (card) => card.value.toString() === activeIdStr
      );

      if (cardIndex === -1) return;

      const cardToMove = cardsInHandRef.current[cardIndex];

      // Check if dropping on a deck slot.
      if (overIdStr.startsWith("deck-slot-")) {
        const slotIndex = parseInt(overIdStr.split("-")[2], 10);
        const currentCardsInHand = [...cardsInHandRef.current];
        const [cardToAdd] = currentCardsInHand.splice(cardIndex, 1);

        let isValid = false;
        let currentDeck;
        let setDeck;

        if (slotIndex === 0) {
          // Decrementing deck 1.
          currentDeck = decrementingDeck1Ref.current;
          const currTopCard = currentDeck[currentDeck.length - 1];
          isValid =
            cardToAdd.value < currTopCard.value ||
            cardToAdd.value - currTopCard.value === 10;
          if (isValid) {
            setCardsInHand(currentCardsInHand);
            setDecrementingDeck1([...currentDeck, cardToAdd]);
            return;
          } else {
            alert(`Card needs to be lower than ${currTopCard.value}`);
          }
        } else if (slotIndex === 1) {
          // Decrementing deck 2.
          currentDeck = decrementingDeck2Ref.current;
          const currTopCard = currentDeck[currentDeck.length - 1];
          isValid =
            cardToAdd.value < currTopCard.value ||
            cardToAdd.value - currTopCard.value === 10;
          if (isValid) {
            setCardsInHand(currentCardsInHand);
            setDecrementingDeck2([...currentDeck, cardToAdd]);
            return;
          } else {
            alert(`Card needs to be lower than ${currTopCard.value}`);
          }
        } else if (slotIndex === 2) {
          // Incrementing deck 1.
          currentDeck = incrementingDeck1Ref.current;
          const currTopCard = currentDeck[currentDeck.length - 1];
          isValid =
            cardToAdd.value > currTopCard.value ||
            currTopCard.value - cardToAdd.value === 10;
          if (isValid) {
            setCardsInHand(currentCardsInHand);
            setIncrementingDeck1([...currentDeck, cardToAdd]);
            return;
          } else {
            alert(`Card needs to be higher than ${currTopCard.value}`);
          }
        } else if (slotIndex === 3) {
          // Incrementing deck 2.
          currentDeck = incrementingDeck2Ref.current;
          const currTopCard = currentDeck[currentDeck.length - 1];
          isValid =
            cardToAdd.value > currTopCard.value ||
            currTopCard.value - cardToAdd.value === 10;
          if (isValid) {
            setCardsInHand(currentCardsInHand);
            setIncrementingDeck2([...currentDeck, cardToAdd]);
            return;
          } else {
            alert(`Card needs to be higher than ${currTopCard.value}`);
          }
        }

        // If validation failed, restore the card to hand.
        setCardsInHand([...currentCardsInHand, cardToAdd]);
        return;
      }

      // If dropping within cards-in-hand, reorder.
      // Check if over is another card (not a deck slot).
      if (!overIdStr.startsWith("deck-slot-") && overIdStr !== activeIdStr) {
        const oldIndex = cardIndex;
        const newIndex = cardsInHandRef.current.findIndex(
          (card) => card.value.toString() === overIdStr
        );

        if (newIndex !== -1) {
          setCardsInHand((items) => arrayMove(items, oldIndex, newIndex));
        }
      }
    },
    [
      setCardsInHand,
      setDecrementingDeck1,
      setDecrementingDeck2,
      setIncrementingDeck1,
      setIncrementingDeck2,
    ]
  );

  const activeCard =
    activeId &&
    cardsInHand.find((card) => card.value.toString() === activeId.toString());

  return (
    <div className="main">
      <div className="deck draw-deck">Draw Deck: ({drawDeck.length})</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <ul className="deck-slots">
          <DeckSlot
            deck={decrementingDeck1}
            label="Going Down:"
            index={0}
            type="decrementing"
          />
          <DeckSlot
            deck={decrementingDeck2}
            label="↓"
            index={1}
            type="decrementing"
          />
          <DeckSlot
            deck={incrementingDeck1}
            label="Going Up:"
            index={2}
            type="incrementing"
          />
          <DeckSlot
            deck={incrementingDeck2}
            label="↑"
            index={3}
            type="incrementing"
          />
        </ul>

        <button onClick={dealCards}>Deal Cards</button>

        <SortableContext
          items={cardsInHand.map((card) => card.value.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="cards-in-hand">
            {cardsInHand.map((card) => (
              <SortableCard key={card.value} card={card} id={card.value} />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay>
          {activeCard ? <Card value={activeCard.value} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default TheGame;
