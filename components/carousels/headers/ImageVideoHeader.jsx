import React from "react";
import Left from "../icons/Left";
import Right from "../icons/Right";

function ImageVideoHeader({ next, prev, curr, className }) {
  return (
    <div className={className}>
      <div className="flex">
        <Left onClick={prev} />
        <div>{curr}</div>
        <Right onClick={next} />
      </div>
    </div>
  );
}

export default ImageVideoHeader;
