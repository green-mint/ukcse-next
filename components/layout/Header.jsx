import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.id ? true : false;
  console.log(isLoggedIn);
  return (
    <div className="flex justify-around bg-slate-400 py-5">
      <div>NavBar</div>
      <div className="flex space-x-5">
        <div className="space-x-3">
          <Link href="/">Home</Link>
          <Link href="/subjects">Subjects</Link>
          <Link href="/users">Users</Link>
        </div>
        <div className="flex justify-between space-x-4">
          {!isLoggedIn ? (
            <>
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
            </>):(
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
