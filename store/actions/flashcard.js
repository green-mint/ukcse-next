export const FLIP_C = 'FLIP_C';
export const FORWARD_C = 'FORWARD_C';
export const BACKWARD_C = 'BACKWARD_C';
export const RESET_C = 'RESET_C';
export const REPEAT_C = 'REPEAT_C';
export const TOGGLE_REPEAT_C = 'TOGGLE_REPEAT_C';
export const SET_CARDS_C = 'SET_CARDS_C';


export const flipCard = () => {
  return {
    type: FLIP_C,
  };
}

export const forwardCard = () => {
  // console.log("Flash cards forward ran");
  return {
    type: FORWARD_C,
  };
}

export const backwardCard = () => {
  return {
    type: BACKWARD_C,
  };
}

export const setCards = (cards) => {
  // console.log("Set cards actions ran")
  return {
    type: SET_CARDS_C,
    payload: cards,
  };
}

export const toggleRepeatCard = () => {
  return {
    type: TOGGLE_REPEAT_C,
  };
}

export const resetCards = () => {
  return {
    type: RESET_C,
  };
}

export const repeatCards = () => {
  return {
    type: REPEAT_C,
  };
}
