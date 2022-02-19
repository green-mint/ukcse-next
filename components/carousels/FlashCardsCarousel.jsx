import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlashcardsHeader from "./headers/FlashcardsHeader";
import {
  backwardCard,
  flipCard,
  forwardCard,
  repeatCards,
  resetCards,
  setCards,
  toggleRepeatCard,
} from "../../store/actions/flashcard";
import Image from "next/image";
import Loading from "../UI/Loading";
import axios from "axios";

function FlashCardsCarousel({ subjectId, chapterId }) {
  // const [cards, setCards] = useState(null);

  const token = useSelector((state) => state.user.token);
  const flashcards = useSelector((state) => state.flashcard);
  // console.log(flashcards);
  const dispatch = useDispatch();

  const backHandler = () => {
    dispatch(backwardCard());
  };

  const forwardHandler = () => {
    dispatch(forwardCard());
  };

  const flipHandler = () => {
    dispatch(flipCard());
  };

  const reset = () => {
    dispatch(resetCards());
  };

  const repeat = () => {
    dispatch(repeatCards());
  };

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/flashcards`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        dispatch(
          setCards(
            res.data.flashCard.map(card => ({
              id: card.id,
              questionUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${card.questionSlug}`,
              answerUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${card.answerSlug}`,
            }))
          )
        );
      })
      .catch((err) => {
        console.log("Error while getting flashcards");
        console.log(err);
      });
  }, []);

  if (!flashcards.repeatedCards) return <Loading />;

  if (flashcards.repeatedCards.length === 0) {
    return <div>No content found!</div>;
  }
  const imgUrl = flashcards.isQuestion ? flashcards.repeatedCards[flashcards.currentCardIndex].questionUrl : flashcards.repeatedCards[flashcards.currentCardIndex].answerUrl
  return (
    <div>
      <FlashcardsHeader
        prev={backHandler}
        next={forwardHandler}
        flipCard={flipHandler}
        reset={reset}
        repeat={repeat}
        onRepeat={flashcards.cardsIndexesToBeRepeated.includes(
          flashcards.currentCardIndex
        )}
        curr={flashcards.currentCardIndex + 1}
        numRepeats={flashcards.cardsIndexesToBeRepeated.length}
        toggleRepeat={() => dispatch(toggleRepeatCard())}
      />
      {/* <Image
        src={{
          uri: flashcards.isQuestion
            ? flashcards.repeatedCards[flashcards.currentCardIndex].questionUrl
            : flashcards.repeatedCards[flashcards.currentCardIndex].answerUrl,
        }}
      /> */}
      <div className="w-96 h-96 relative bg-slate-900">
        <Image className="overflow-hidden" loader={() => imgUrl} src={imgUrl} layout="fill" alt={imgUrl} />
      </div>
    </div>
  );
}

export default FlashCardsCarousel;
