import React from 'react'
import FlashcardsHeader from "./headers/FlashcardsHeader";

function FlashCardsCarousel({ subjectId, chapterId }) {
  return (
    <div className='flex flex-col items-center'>
      <FlashcardsHeader curr={3} />
    </div>
  )
}

export {FlashCardsCarousel}