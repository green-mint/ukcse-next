import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/user";

function Dropdown({ name, userId }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandler = () => {
    dispatch(logout());
    setOpen(false);
    router.replace("/");
  }
  return (
    <div className="relative text-left ml-5 my-auto">
      <div>
        <button onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center w-full font-semibold text-lg "
        >
          {name}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${open ? "": "hidden"} origin-top-right text-black absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
        <ul className="p-2 divide-y-2 divide-neutral-300" role="none">
          <li className="p-2 text-lg font-semibold text-center"><Link href={`/users/${userId}`}>My Profile</Link></li>
          <li className="p-2 text-lg font-semibold text-center"><button onClick={logoutHandler}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
