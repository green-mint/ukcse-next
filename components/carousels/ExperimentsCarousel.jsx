import axios from "axios";
import React, { useState, useEffect } from "react";
import ForwardReverseHeader from "./headers/ForwardReverseHeader";

function ExperimentsCarousel({ subjectId, chapterId }) {
  const [experiments, setExperiments] = useState([]);
  const [currentExperiment, setCurrentExperiment] = useState(0);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/experiments`;
    axios.get(url).then(res => {
      // setExperiments(res.data.experiments);
      setExperiments(["http://www.google.com", "http://localhost:3000/"]);
    });
  }, [chapterId, subjectId]);

  const nextHandler = () => {
    if (currentExperiment < experiments.length - 1) {
      setCurrentExperiment(currentExperiment + 1);
    }
  };

  const prevHandler = () => {
    if (currentExperiment > 0) {
      setCurrentExperiment(currentExperiment - 1);
    }
  };

  return (
    <div className="flex flex-col items-center my-4">
      <ForwardReverseHeader
        curr={currentExperiment}
        next={nextHandler}
        prev={prevHandler}
      />
      <div
        className="relative mt-4"
        style={{
          width: "60%",
          minWidth: "60%",
          minHeight: "70vh",
        }}
      >
        {experiments && !experiments.length ? (
          <div className="text-center">No experiments</div>
        ) : (
          <iframe
            className="absolute w-full h-full"
            src={experiments[currentExperiment]}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export { ExperimentsCarousel };
