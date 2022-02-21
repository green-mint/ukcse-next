import { useRouter } from "next/router";
import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import NotFoundPage from "../NotFoundPage";
import {
  ImageCarousel,
  VideoCarousel,
  ExperimentsCarousel,
  SimulationsCarousel,
  // QuizCarousel,
} from "../../../../components/carousels";
import FlashCardsCarousel from "../../../../components/carousels/FlashCardsCarousel";
import QuizCarousel from "../../../../components/carousels/QuizCarousel";
import TabNav from "../../../../components/UI/TabNav";

function ChapterDetailsPage() {
  const router = useRouter();
  const { subjectId, chapterId } = router.query;
  const [currTab, setCurrTab] = useState(0);
  if (!subjectId || !chapterId) return null;
  let carousel = null;
  switch (currTab) {
    case 0:
      carousel = <ImageCarousel subjectId={subjectId} chapterId={chapterId} />;
      break;
    case 1:
      carousel = <VideoCarousel subjectId={subjectId} chapterId={chapterId} />;
      break;
    case 2:
      // carousel = <FlashCardsCarousel subjectId={subjectId} chapterId={chapterId} />;
      carousel = (
        <FlashCardsCarousel subjectId={subjectId} chapterId={chapterId} />
      );
      break;
    case 3:
      // carousel = <QuizCarousel subjectId={subjectId} chapterId={chapterId} />;
      carousel = <QuizCarousel subjectId={subjectId} chapterId={chapterId} />;
      break;
    case 4:
      carousel = (
        <SimulationsCarousel subjectId={subjectId} chapterId={chapterId} />
      );
      break;
    case 5:
      carousel = (
        <ExperimentsCarousel subjectId={subjectId} chapterId={chapterId} />
      );
      break;
    default:
      carousel = <div>Error</div>;
      break;
  }

  return (
    <div className="">
      <div>{carousel}</div>
      <div className="flex justify-center mb-0">
        <TabNav setCurrTab={setCurrTab} currTab={currTab} />
      </div>
    </div>
  );
}

export default ChapterDetailsPage;
