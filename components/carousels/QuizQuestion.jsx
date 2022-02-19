import React, { useEffect } from "react";
import QuizOption from "./QuizOption";

const QuizQuestion = ({ question, optionsChecked, setCheckedOptions }) => {
  useEffect(() => {
    return () => {
      setCheckedOptions(question, optionsChecked);
    };
  }, [question]);

  const onCheckHandler = (isChecked, option) => {
    if (isChecked) {
      optionsChecked.push(option.id);
    } else {
      optionsChecked = optionsChecked.filter((id) => id !== option.id);
    }
  };

  return (
    <div>
      <strong>{question.statement}</strong>
      <div className="flex flex-col">
        {question.options &&
          question.options.map((option, i) => (
            <QuizOption
              key={option.id}
              text={option.value}
              onPress={(isChecked) => {
                onCheckHandler(isChecked, option);
              }}
              isOptionChecked={optionsChecked.includes(option.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
