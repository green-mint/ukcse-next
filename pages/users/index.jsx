import axios from "axios";
import React from "react";
import ButtonList from "../../components/content/ButtonList";
import Container from "../../components/layout/Container";

function UsersList({ users }) {
  if (!users) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">Users</h1>
        <div>
          <ButtonList data={users} />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
  try {
    const res = await axios.get(url);
    return {
      props: {
        users: res.data.users.map(user => ({
          name: user.name,
          id: user.id,
          navigateTo: `/users/${user.id}`,
        })),
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log("Error Occurred while fetching users");
    console.log(url);
    // console.log(err);
    return {
      props: {},
      revalidate: 10,
    };
  }
}

export default UsersList;
