import React from "react";
import ProgressBar from "./ProgressBar";
import { getBackEndData } from "./BackEndData";

const BackEnd = () => {
  const backend = getBackEndData();
  return (
    <div className="container text-center">
      <div className="row">
        {backend.map((data) => {
          return (
            <div key={data.id} className="col-md-6 text-center">
              <ProgressBar
                name={data.name}
                bgcolor={data.bgcolor}
                progress={data.progress}
                color={data.color}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BackEnd;
