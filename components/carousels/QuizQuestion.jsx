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
      optionsChecked = optionsChecked.filter(id => id !== option.id);
    }
  };

  return (
    <div
      className="relative mt-2"
      style={{
        width: "40%",
        minWidth: "40%",
      }}
    >
      <div className="mt-4">
        <div className="font-bold lg:text-4xl md:text-2xl text-xl text-center my-4">
          {question.statement}
        </div>
        <div className="flex mx-auto flex-col max-w-max">
          {question.options &&
            question.options.map((option, i) => (
              <QuizOption
                key={option.id}
                text={option.value}
                onPress={isChecked => {
                  onCheckHandler(isChecked, option);
                }}
                isOptionChecked={optionsChecked.includes(option.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
