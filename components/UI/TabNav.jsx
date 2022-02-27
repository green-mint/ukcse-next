import React from "react";

function TabNav({ currTab, setCurrTab }) {
  const tabs = [
    {
      label: "Images",
      tabIdx: 0,
    },
    {
      label: "Videos",
      tabIdx: 1,
    },
    {
      label: "Flash Cards",
      tabIdx: 2,
    },
    {
      label: "Quiz",
      tabIdx: 3,
    },
    {
      label: "Simulations",
      tabIdx: 4,
    },
    {
      label: "Experiments",
      tabIdx: 5,
    },
  ];

  return (
    <div className="absolute">
      <div className="flex justify-around space-x-3 py-5">
        {tabs.map(tab => (
          <div
            key={tab.tabIdx}
            className={`cursor-pointer text-blue-500 hover:underline hover:text-blue-400 ${
              currTab === tab.tabIdx && "underline"
            }`}
            onClick={() => setCurrTab(tab.tabIdx)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabNav;
