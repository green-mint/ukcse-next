import React, { useState } from "react";
// import { div, Text, StyleSheet, button } from "react-native";
// import {
//   buttonBackgroundColor,
//   quizOptionBackgroundColorSelected,
//   quizOptionBackgroundColorUnselected,
//   quizOptionBorderColor,
//   quizOptionTextColorSelected,
//   quizOptionTextColorUnselected,
// } from "../../cssConfig";

const QuizOption = ({ text, onPress, isOptionChecked, allowedMultiple }) => {
  const [isChecked, setIsChecked] = useState(isOptionChecked || false);

  const onOptionPressHandler = () => {
    setIsChecked(!isChecked);
    onPress(!isChecked);
  };

  const checkedClasses = isChecked ? "bg-blue-500" : "bg-white";

  return (
    <button
    className={` ${checkedClasses} border-2 border-gray-400 p-2 m-2 rounded-lg`}
      onClick={onOptionPressHandler}>
      <div>
          {text}
      </div>
    </button>
  );
};

export default QuizOption;