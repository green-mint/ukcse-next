import React from "react";
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";
import { AiOutlineExperiment } from "react-icons/ai";
import { BiAtom } from "react-icons/bi";
import { CgStack } from "react-icons/cg";

function TabNav({ currTab, setCurrTab }) {
  const tabs = [
    {
      label: "Images",
      icon: <IoImageOutline size={20} />,
      tabIdx: 0,
    },
    {
      label: "Videos",
      icon: <IoVideocamOutline size={20} />,
      tabIdx: 1,
    },
    {
      label: "Flashcards",
      icon: <CgStack size={20} />,
      tabIdx: 2,
    },
    {
      label: "Quiz",
      icon: <MdOutlineQuiz size={20} />,
      tabIdx: 3,
    },
    {
      label: "Simulations",
      icon: <BiAtom size={20} />,
      tabIdx: 4,
    },
    {
      label: "Experiments",
      icon: <AiOutlineExperiment size={20} />,
      tabIdx: 5,
    },
  ];

  const classNameFocused = "bg-blue-500 text-white";
  const classNameUnfocused = "text-blue-500";

  return (
    <div className="flex w-full justify-evenly space-x-3 py-5">
      {tabs.map((tab) => (
        <div
          key={tab.tabIdx}
          className={`cursor-pointer p-2 px-3 rounded-lg ${
            currTab === tab.tabIdx ? classNameFocused : classNameUnfocused
          }`}
          onClick={() => setCurrTab(tab.tabIdx)}>
          <div className="flex md:hidden">{tab.icon}</div>
          <div className="hidden md:flex">{tab.label}</div>
        </div>
      ))}
    </div>
  );
}

export default TabNav;
