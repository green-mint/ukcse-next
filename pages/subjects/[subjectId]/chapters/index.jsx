import axios from 'axios';
import React from 'react'
import ButtonList from '../../../../components/content/ButtonList';
import Container from '../../../../components/layout/Container';

function ChaptersListPage({ chapters }) {
  if (!chapters) {
    return <div>Error</div>;
  }
  
  return (
    <Container>
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">Chapters</h1>
        <div>
          <ButtonList data={chapters} />
        </div>
      </div>
    </Container>
  )
}

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects`;

  try {
    const res = await axios.get(url);
    return {
      paths: res.data.subjects.map((subject) => ({
        params: {
          subjectId: subject.id,
        },
      })),
      fallback: false,
    };
  } catch (err) {
    console.log("Error Occoured while fetching subjects");
    console.log(url);
    // console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps({ params }) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${params.subjectId}/chapters`;

  try {
    const res = await axios.get(url);
    return {
      props: {
        chapters: res.data.chapters.map((chapter) => ({
          name: chapter.name,
          id: chapter.id,
          navigateTo: `/subjects/${params.subjectId}/chapters/${chapter.id}`,
        })),
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log("Error Occoured while fetching chapters");
    console.log(url);
    // console.log(err);
    return {
      props: {},
      revalidate: 10,
    };
  }
}

export default ChaptersListPage