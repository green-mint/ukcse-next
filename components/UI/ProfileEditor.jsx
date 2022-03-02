import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditableList from "./EditableList";

function ProfileEditor({ entity, setEditing, items, setData }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const save = (items) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user.id}/profile/${entity}`;
    axios
      .put(
        url,
        {
          [entity]: items,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        toast.error(`Error saving ${entity}`);
      })
  };

  return (
    <div className="flex justify-center items-center absolute w-screen h-screen top-0 left-0 ">
      <div
        onClick={() => setEditing(null)}
        className="w-full h-full bg-black opacity-60 absolute"
      />
      <div className="bg-white z-50 rounded-xl p-5">
        <h1 className="font-bold text-xl text-black">Edit {entity}</h1>
        <div>
          <EditableList save={save} items={items} />
        </div>
      </div>
    </div>
  );
}

export default ProfileEditor;
