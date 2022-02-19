import { combineReducers, createStore } from "@reduxjs/toolkit";
import quizReducer from "./reducers/quiz";
import flashcardReducer from "./reducers/flashcard";
import userReducer from "./reducers/user";

const rootReducer = combineReducers({
  user: userReducer,
  quiz: quizReducer,
  flashcard: flashcardReducer,
});

const store = createStore(rootReducer);

export default store;