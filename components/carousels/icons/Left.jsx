import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";

function Left({ onClick, size=30, color }) {
  return (
    <div>
      <AiFillCaretLeft className="" onClick={onClick} size={size} color={color} />
    </div>
  );
}

export default Left;
