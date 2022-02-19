import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import Image from "next/image"
import ImageVideoHeader from "./headers/ImageVideoHeader";

function ImageCarousel({ subjectId, chapterId }) {
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  const token = "";
  const userId = "";

  const backHandler = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const forwardHandler = () => {
    // console.log("Going forwards");
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/images`;
    console.log(url);
    axios
      .get(url)
      .then((res) => {
        setImages(
          res.data.images.map((image) => ({
            id: image.id,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.slug}`,
          }))
        );
      })
      .catch((err) => {
        console.log("Error while getting images");
        console.log(err);
      });
  }, []);

  if (!images) return <Loading />;

  if (images.length === 0) return <div>Did not find any images</div>;

  return (
    <div className="flex flex-col items-center">
      <ImageVideoHeader
        className="my-4"
        next={forwardHandler}
        prev={backHandler}
        curr={currentImage}
      />
      {/* {images[currentImage].url} */}
      <div className="w-96 h-96 relative bg-slate-900">
        <Image className="overflow-hidden" loader={() => images[currentImage].url} layout="fill" src={images[currentImage].url} alt={images[currentImage].id} />
      </div>
    </div>
  );
}

export { ImageCarousel };
