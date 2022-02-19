const {
  FORWARD,
  BACKWARD,
  RESET,
  REPEAT,
  TOGGLE_REPEAT,
  SET_QUESTIONS,
  SET_MARKED_OPTIONS,
} = require("../actions/quiz");

const initialState = {
  questions: null,
  currentQuestionIndex: 0,
  repeatedQuestions: null,
  questionIndexesToBeRepeated: [],
  attempt: [],
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORWARD:
      if (state.currentQuestionIndex >= state.repeatedQuestions.length - 1) return state; 
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case BACKWARD:
      if (state.currentQuestionIndex <= 0) return state;
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex - 1,
      };
    case RESET:
      return {
        ...state,
        currentQuestionIndex: 0,
        repeatedQuestions: state.questions,
        questionIndexesToBeRepeated: [],
        attempt: state.attempt.map((question) => ({
          ...question,
          optionIds: [],
        }))
      };
    case REPEAT:
      if (state.questionIndexesToBeRepeated.length === 0) return state;
      return {
        ...state,
        currentQuestionIndex: 0,
        repeatedQuestions: state.repeatedQuestions.filter(
          (q, index) => state.questionIndexesToBeRepeated.includes(index)
        ),
        questionIndexesToBeRepeated: [],
      };
    case TOGGLE_REPEAT:
      return {
        ...state,
        questionIndexesToBeRepeated: state.questionIndexesToBeRepeated.includes(
          state.currentQuestionIndex
        )
          ? state.questionIndexesToBeRepeated.filter(
              (i) => i !== state.currentQuestionIndex
            )
          : [...state.questionIndexesToBeRepeated, state.currentQuestionIndex],
      };
    case SET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        repeatedQuestions: action.payload,
        attempt: action.payload.map((question) => ({
          questionId: question.id,
          optionIds: [],
        }))
      };
    
    case SET_MARKED_OPTIONS:
      // console.log("SUCCESSFULLY RECEIVED")
      let newAttempt = [...state.attempt];
      const changedQid = state.questions.findIndex(question => (question.id === action.payload.questionId))
      
      newAttempt[changedQid] = {
        ...newAttempt[changedQid],
        optionIds: action.payload.optionIds
      }

      return {
        ...state,
        attempt: newAttempt,
      };
    default:
      return state;
  }
};

export default quizReducer;