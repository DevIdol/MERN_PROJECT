import React from "react";
import ProgressBar from "./ProgressBar";
import { getFrontEndData } from "./FrontEndData";

const FrontEnd = () => {
  const frontend = getFrontEndData();
  return (
    <div className="container text-center">
      <div className="row">
        {frontend.map((data) => {
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

export default FrontEnd;
