import axios from "axios";
import React from "react";
import ButtonList from "../../components/content/ButtonList";
import Container from "../../components/layout/Container";

function SubjectsList({ subjects }) {
  if (!subjects) {
    return <Container>Error</Container>;
  }
  return (
    <Container>
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">Subjects</h1>
        <div>
          <ButtonList data={subjects} />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects`;

  try {
    const res = await axios.get(url);
    return {
      props: {
        subjects: res.data.subjects.map((subject) => ({
          name: subject.name,
          id: subject.id,
          navigateTo: `/subjects/${subject.id}/chapters`,
        })),
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log("Error Occoured while fetching subjects");
    console.log(url);
    // console.log(err);
    return {
      props: {},
      revalidate: 10,
    };
  }
}

export default SubjectsList;
