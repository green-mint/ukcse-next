import axios from "axios";
import React, { useEffect, useState } from "react";
import ForwardReverseHeader from "./headers/ForwardReverseHeader";

function SimulationsCarousel({ subjectId, chapterId }) {
  const [simulations, setSimulations] = useState([]);
  const [currentSimulation, setCurrentSimulation] = useState(0);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subjects/${subjectId}/chapters/${chapterId}/simulations`;
    axios.get(url).then(res => {
      setSimulations(res.data.simulations);
    });
  }, [chapterId, subjectId]);

  const nextHandler = () => {
    if (currentSimulation < simulations.length - 1) {
      setCurrentSimulation(currentSimulation + 1);
    }
  };

  const prevHandler = () => {
    if (currentSimulation > 0) {
      setCurrentSimulation(currentSimulation - 1);
    }
  };

  return (
    <div className="flex flex-col items-center my-4">
      <ForwardReverseHeader
        curr={currentSimulation}
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
        {simulations && !simulations.length ? (
          <div className="text-center">No simulations</div>
        ) : (
          <iframe
            className="absolute w-full h-full"
            src={simulations[currentSimulation]}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export { SimulationsCarousel };
