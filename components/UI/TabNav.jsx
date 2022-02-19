import React from 'react';

function TabNav({ currTab, setCurrTab }) {
  return <div className='absolute'>
    <div className='flex justify-around space-x-3 py-5'>
      <div onClick={() => setCurrTab(0)}>
        Images
      </div>
      <div onClick={() => setCurrTab(1)}>
        Videos
      </div>
      <div onClick={() => setCurrTab(2)}>
        FlashCards
      </div>
      <div onClick={() => setCurrTab(3)}>
        Quizes
      </div>
      <div onClick={() => setCurrTab(4)}>
        Simulations
      </div>
      <div onClick={() => setCurrTab(5)}>
        Experiments
      </div>
      
    </div>
  </div>;
}

export default TabNav;
