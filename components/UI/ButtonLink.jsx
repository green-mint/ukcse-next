import React from "react";
import { Link } from "react-router-dom";

function Button({ text, navigateTo }) {
  return (
    <Link className="w-1/3" to={navigateTo}>
      <div className="text-btn-text bg-btn-bg hover:cursor-pointer hover:bg-btn-bg-hover px-5 py-2 rounded-md w-full">
        {text}
      </div>
    </Link>
  );
}

export default Button;
