import SmallButton from "../../UI/SmallButton";
import Left from "../icons/Left";
import Right from "../icons/Right";

const FlashcardsHeader = ({
  prev,
  next,
  curr,
  repeat,
  reset,
  toggleRepeat,
  numRepeats,
  onRepeat,
  flipCard,
  className,
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div>
        <Left onClick={prev} size={35} />
      </div>

      <div className="lg:flex space-y-3 lg:space-y-0 lg:space-x-3">
        <div className="flex justify-center space-x-3">
          <SmallButton text="Reset" onClick={reset} />
          <SmallButton text={curr} />

          <SmallButton text="Flip" onClick={flipCard} />
        </div>

        <div className="flex justify-center space-x-3">
          <SmallButton
            text={`${
              onRepeat ? "Remove from repeat" : "Add to Repeat"
            } ${numRepeats}`}
            onClick={toggleRepeat}
          />

          <SmallButton text="Repeat" onClick={repeat} />
        </div>
      </div>

      <div>
        <Right size={35} onClick={next} />
      </div>
    </div>
  );
};

export default FlashcardsHeader;
