import React from "react";
import classes from "./ProgressBar.module.css";

const ProgressBar = ({name, bgcolor, progress, color }) => {
  const Progressbar = {
    width: `${progress}%`,
    backgroundColor: bgcolor,
    textAlign: "center",
  };

  return (
    <div className={classes.skill}>
      <h6 className={classes.name}>{name}</h6>
      <div className={classes["progress-bar"]}>
        <div className={classes.progress} style={Progressbar}>
          <span
            className={classes["progress-text"]}
            style={{ color: color }}
          >{`${progress}%`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
