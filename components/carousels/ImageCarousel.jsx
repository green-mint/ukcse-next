import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import Image from "next/image";
import ForwardReverseHeader from "./headers/ForwardReverseHeader";

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
      .then(res => {
        setImages(
          res.data.images.map(image => ({
            id: image.id,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.slug}`,
          }))
        );
      })
      .catch(err => {
        console.log("Error while getting images");
        console.log(err);
      });
  }, [chapterId, subjectId]);

  if (!images) return <Loading />;

  if (images.length === 0) return <div>Did not find any images</div>;

  return (
    <div className="flex flex-col items-center">
      <ForwardReverseHeader
        className="my-4"
        next={forwardHandler}
        prev={backHandler}
        curr={currentImage}
      />
      {/* {images[currentImage].url} */}
      <div
        className="relative bg-slate-900"
        style={{
          width: "60%",
          minWidth: "60%",
        }}
      >
        <Image
          width={911}
          height={512}
          className="overflow-hidden"
          layout="responsive"
          loader={() => images[currentImage].url}
          src={images[currentImage].url}
          alt={images[currentImage].id}
        />
      </div>
    </div>
  );
}

export { ImageCarousel };
