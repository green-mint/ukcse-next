import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector(state => state.user);
  const isLoggedIn = user.id ? true : false;
  console.log(isLoggedIn);
  return (
    <div className="flex justify-around text-white bg-blue-500 py-5">
      <div className="text-xl font-semibold items-center md:w-1/2 w-fit justify-start">
        <Link href="/">NavBar</Link>
      </div>
      <div className="flex space-x-7 font-semibold text-sm md:text-base">
        <div className="sm:space-x-5 md:space-x-5 lg:space-x-7">
          <Link href="/">Home</Link>
          <Link href="/subjects">Subjects</Link>
          <Link href="/users">Users</Link>
        </div>
        <div className="flex justify-between space-x-4">
          {!isLoggedIn ? (
            <>
              <Link href="/auth/login">Login</Link>
              <Link href="/auth/register">Register</Link>
            </>
          ) : (
            <>
              <div className="space-x-1 cursor-pointer">
                <span>{user.name}</span>
                <span>v</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
