import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import Dropdown from "../header/Dropdown";
import { logout } from "../../store/actions/user";

function Header() {
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.id ? true : false;
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-600 p-4 lg:px-16 flex justify-between z-50">
      <h2 className="text-2xl font-semibold text-white z-50">NavBar</h2>
      <div className="md:hidden z-50">
        <AiOutlineMenu
          onClick={() => setNavOpen(!navOpen)}
          className="z-50 cursor-pointer"
          size={30}
          color="white"
        />
      </div>
      <div className="hidden md:flex text-white">
        <ul className="flex justify-end items-center space-x-5">
          <li className="font-semibold text-lg">
            <Link href="/">Home</Link>
          </li>
          <li className="font-semibold text-lg">
            <Link href="/users">Users</Link>
          </li>
          <li className="font-semibold text-lg">
            <Link href="/subjects">Subjects</Link>
          </li>
          {/* <li><Link href="/">Home</Link></li> */}
          {isLoggedIn ? (
            <Dropdown name={user.name} userId={user.id} />
          ) : (
            <>
              <li onClick={() => setNavOpen(false)} className="font-semibold text-lg">
                <Link href="/auth/login">Login</Link>
              </li>
              <div onClick={() => setNavOpen(false)} className="font-semibold text-lg">
                <Link href="/auth/register">Register</Link>
              </div>
            </>
          )}
        </ul>
      </div>
      <div
        className={`${
          navOpen ? "-translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } py-5 text-white top-0 right-0 bg-black h-screen absolute w-screen z-10 flex flex-col text-2xl justify-center items-center text-center space-y-10 transition-all ease-out duration-700`}>
        <div className="flex flex-col justify-center space-y-3">
          <div onClick={() => setNavOpen(false)}>
            <Link href="/">Home</Link>
          </div>
          <div onClick={() => setNavOpen(false)}>
            <Link href="/subjects">Subjects</Link>
          </div>
          <div onClick={() => setNavOpen(false)}>
            <Link href="/users">Users</Link>
          </div>
          {isLoggedIn ? (
            <>
              <div onClick={() => setNavOpen(false)} className="pt-10">
                <Link href={`/users/${user.id}`}>My Profile</Link>
              </div>
              <div onClick={() => setNavOpen(false)} className="">
                <button onClick={() => dispatch(logout())}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div onClick={() => setNavOpen(false)} className="pt-10">
                <Link href="/">Login</Link>
              </div>
              <div onClick={() => setNavOpen(false)} className="">
                <Link href="/">Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
