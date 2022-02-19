import React from 'react'

function Button({ className, text, onClick }) {
  return (
    <div className={className}>
      <div onClick={onClick} className='p-3 px-4 rounded-md bg-btn-bg hover:bg-btn-bg-hover text-btn-text'>{text}</div>
    </div>
  )
}

export default Button