import Link from "next/link";
import React from "react";
// import { Link from "react-router-dom";
// import ButtonLink from "../UI/ButtonLink";

function ButtonList({ data }) {
  const buttons = data.map(item => (
    <Link href={item.navigateTo} key={item.id}>
      <a className="bg-btn-bg text-btn-text px-4 py-2 rounded-md hover:bg-btn-bg-hover w-full">
        {item.name}
      </a>
    </Link>
  ));
  return (
    <div className="flex items-center justify-center">
      <div className="w-1/2 md:max-w-max py-6 space-y-3 flex flex-col items-center justify-center">
        {buttons}
      </div>
    </div>
  );
}

export default ButtonList;
