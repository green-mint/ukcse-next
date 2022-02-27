import React from "react";
import Left from "../icons/Left";
import Right from "../icons/Right";

function ForwardReverseHeader({ next, prev, curr, className }) {
  return (
    <div className={className}>
      <div className="flex">
        <Left color={"rgb(59, 130, 246)"} onClick={prev} />
        <div>{curr}</div>
        <Right color={"rgb(59, 130, 246)"} onClick={next} />
      </div>
    </div>
  );
}

export default ForwardReverseHeader;
