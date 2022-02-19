export const FORWARD = 'FORWARD';
export const BACKWARD = 'BACKWARD';
export const RESET = 'RESET';
export const REPEAT = 'REPEAT';
export const TOGGLE_REPEAT = 'TOGGLE_REPEAT';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_MARKED_OPTIONS = 'SET_MARKED_OPTIONS';

export const forward = () => {
  return {
    type: FORWARD,
  };
}

export const backward = () => {
  return {
    type: BACKWARD,
  };
}

export const setQuestions = (questions) => {
  // console.log(questions);
  return {
    type: SET_QUESTIONS,
    payload: questions,
  };
}

export const toggleRepeat = () => {
  return {
    type: TOGGLE_REPEAT,
  };
}

export const resetQuiz = () => {
  return {
    type: RESET,
  };
}

export const repeatQuiz = () => {
  return {
    type: REPEAT,
  };
}

export const setMarkedOptions = (questionId, markedOptions) => {
  return {
    type: SET_MARKED_OPTIONS,
    payload: {
      questionId,
      markedOptions,
    },
  };
}