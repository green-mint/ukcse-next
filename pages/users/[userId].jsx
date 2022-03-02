import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../../components/UI/Modal";
import ProfileEditor from "../../components/UI/ProfileEditor";

function User() {
  const router = useRouter();
  const { userId } = router.query;
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!userId) return;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}/profile`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        console.log(res.data.user);
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading || !userData) {
    return <div>Loading...</div>;
  }

  return (
    // <div>User {userId} {JSON.stringify(user)}</div>
    <div className="flex flex-col items-center justify-center mt-10">
      {editing ? (
        <ProfileEditor
          entity={editing}
          setEditing={setEditing}
          items={userData[editing].map((item) => item.name)}
          setData={setUserData}
        />
      ) : null}
      <div className="w-36 h-36 rounded-full bg-gradient-to-b from-[#c31432] to-[#240b36]"></div>

      <div className="text-center">
        <h1 className="text-2xl mt-5 font-semibold">{userData.name}</h1>
        <p className="text-gray-600">{userData.email}</p>
      </div>

      <div>
        <div className="flex mt-10 space-x-3">
          <h2 className="font-semibold text-2xl ">Hobbies</h2>
          <AiOutlineEdit
            className="text-2xl mt-1 hover:cursor-pointer"
            onClick={() => setEditing("hobbies")}
          />
        </div>

        <ul className="mt-5">
          {userData.hobbies.map((hobby, index) => (
            <li key={index} className="text-gray-600">
              {hobby.name}
            </li>
          ))}
        </ul>
      </div>

      {/* do the same for interests */}
      <div>
        <div className="flex mt-10 space-x-3">
          <h2 className="font-semibold text-2xl ">Interests</h2>
          <AiOutlineEdit
            className="text-2xl mt-1 hover:cursor-pointer"
            onClick={() => setEditing("interests")}
          />
        </div>

        <ul className="mt-5">
          {userData.interests.map((interest, index) => (
            <li key={index} className="text-gray-600">
              {interest.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default User;
