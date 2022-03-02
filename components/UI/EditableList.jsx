import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

function EditableList({ save, items }) {
  const [eitems, setEitems] = useState(items);
  const inputRef = useRef();

  const addItem = () => {
    const input = inputRef.current;
    if (input.value) {
      setEitems([...eitems, input.value]);
      input.value = "";
    }
  };

  const saveItems = () => {
    save(eitems);
  }

  const deleteItem = (index) => {
    const newItems = [...eitems];
    newItems.splice(index, 1);
    setEitems(newItems);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <ul className="space-y-2 my-4">
        {eitems.map((item, index) => (
          <li className="w-full space-x-3 flex justify-between" key={index}><div>{item}</div> <button onClick={() => deleteItem(index)} className="bg-red-600 p-1 rounded-md text-white">Delete</button> </li>
        ))}
      </ul>
      {/* {user.token} */}
      <input
        ref={inputRef}
        className="p-1 border border-blue-500 rounded-lg my-3"
      />
      <div className="flex justify-between w-full">
        <button
          className="bg-blue-500 p-1 px-2 rounded-md text-white mx-auto"
          onClick={addItem}>
          Add
        </button>

        <button className="bg-blue-500 p-1 px-2 rounded-md text-white mx-auto"
          onClick={saveItems}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditableList;
