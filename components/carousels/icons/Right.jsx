import React from 'react'
import { AiFillCaretRight } from 'react-icons/ai'

function Right({ onClick, size=30 }) {
  return (
    <div>
      <AiFillCaretRight onClick={onClick} size={size} />
    </div>
  )
}

export default Right