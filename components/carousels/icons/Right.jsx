import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

function Right({ onClick, size = 30, color }) {
  return (
    <div className="cursor-pointer">
      <AiFillCaretRight onClick={onClick} color={color} size={size} />
    </div>
  );
}

export default Right;
