import {
  BACKWARD_C,
  FLIP_C,
  FORWARD_C,
  REPEAT_C,
  RESET_C,
  SET_CARDS_C,
  TOGGLE_REPEAT_C,
} from "../actions/flashcard";

const initialState = {
  cards: null,
  currentCardIndex: 0,
  isQuestion: true,
  repeatedCards: null,
  cardsIndexesToBeRepeated: [],
};

const flashcardReducer = (state = initialState, action) => {
  // console.log("RUNNING THE FLASHCARD REDUCER" + action.type);
  switch (action.type) {
    case FLIP_C:
      return {
        ...state,
        isQuestion: !state.isQuestion,
      };
    case FORWARD_C:
      if (state.currentCardIndex >= state.repeatedCards.length - 1) return state;
      return {
        ...state,
        currentCardIndex: state.currentCardIndex + 1,
        isQuestion: true,
      };
    case BACKWARD_C:
      if (state.currentCardIndex <= 0) return state;
      return {
        ...state,
        currentCardIndex: state.currentCardIndex - 1,
        isQuestion: true,
      };
    case SET_CARDS_C:
      // console.log("Set Cards reducer ran");
      return {
        ...state,
        cards: action.payload,
        repeatedCards: action.payload,
      };
    case REPEAT_C:
      return {
        ...state,
        currentCardIndex: 0,
        repeatedCards: state.cards.filter((c, index) =>
          state.cardsIndexesToBeRepeated.includes(index)
        ),
        cardsIndexesToBeRepeated: [],
        isQuestion: true,
      };
    case TOGGLE_REPEAT_C:
      console.log(state.currentCardIndex);
      return {
        ...state,
        cardsIndexesToBeRepeated: state.cardsIndexesToBeRepeated.includes(
          state.currentCardIndex
        )
          ? state.cardsIndexesToBeRepeated.filter(
              (i) => i !== state.currentCardIndex
            )
          : [...state.cardsIndexesToBeRepeated, state.currentCardIndex],
      };

    case RESET_C:
      return {
        ...state,
        currentCardIndex: 0,
        repeatedCards: state.cards,
        cardsIndexesToBeRepeated: [],
        isQuestion: true,
      };
    default:
      return state;
  }
};

export default flashcardReducer;
