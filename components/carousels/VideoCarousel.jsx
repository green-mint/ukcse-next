import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import ForwardReverseHeader from "./headers/ForwardReverseHeader";

function VideoCarousel({ subjectId, chapterId }) {
  const [videos, setVideos] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  const token = "";
  const userId = "";

  const backHandler = () => {
    if (currentVideo > 0) {
      setCurrentVideo(currentVideo - 1);
    }
  };

  const forwardHandler = () => {
    // console.log("Going forwards");
    if (currentVideo < videos.length - 1) {
      setCurrentVideo(currentVideo + 1);
    }
  };

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/videos`;
    console.log(url);
    axios
      .get(url)
      .then(res => {
        setVideos(
          res.data.videos.map(video => ({
            id: video.id,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${video.slug}`,
          }))
        );
      })
      .catch(err => {
        console.log("Error while getting videos");
        console.log(err);
      });
  }, [chapterId, subjectId]);

  if (!videos) return <Loading />;

  if (videos.length === 0) return <div>Did not find any videos</div>;

  return (
    <div className="flex flex-col items-center">
      <ForwardReverseHeader
        className="my-4"
        next={forwardHandler}
        prev={backHandler}
        curr={currentVideo}
      />
      {/* {videos[currentVideo].url} */}
      <div className="flex justify-center w-4/5 lg:w-3/5 lg:min-w-[60%] min-w-[80%] bg-slate-900">
        <video
          className="overflow-hidden"
          src={videos[currentVideo].url}
          controls
        />
      </div>
    </div>
  );
}

export { VideoCarousel };
