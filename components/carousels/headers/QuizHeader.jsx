import Button from "../../UI/Button";
import Left from "../icons/Left";
import Right from "../icons/Right";

const QuizHeader = ({
  prev,
  next,
  curr,
  repeat,
  reset,
  toggleRepeat,
  numRepeats,
  onRepeat,
  submit
}) => {
  return (
    <div className="flex justify-center items-center">
      <div>
        <Left onClick={prev} size={35} />
      </div>

      <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-3">
        <div className="flex justify-center space-x-3">
          <Button
            text="Reset"
            onClick={reset}
          />
          <Button
            text={curr}
          />

          <Button
            text="Submit"
            onClick={submit}
          />
        </div>

        <div className="flex justify-center space-x-3">
          <Button
            text={`${
              onRepeat ? "Remove from repeat" : "Add to Repeat"
            } ${numRepeats}`}
            onClick={toggleRepeat}
          />

          <Button
            text="Repeat"
            onClick={repeat}
          />
        </div>
      </div>

      <div>
        <Right size={35} onClick={next} />
      </div>
    </div>
  );
};

export default QuizHeader;