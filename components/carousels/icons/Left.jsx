import React from "react";
import { AiFillCaretLeft } from "react-icons/ai";

function Left({ onClick, size = 30, color }) {
  return (
    <div className="cursor-pointer">
      <AiFillCaretLeft
        className=""
        onClick={onClick}
        size={size}
        color={color}
      />
    </div>
  );
}

export default Left;
