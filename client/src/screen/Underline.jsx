import React from "react";

const Underline = (props) => {
  return (
    <div
      className={props.className}
      style={{
        height: "2px",
        marginTop: "-4px",
        margin: "0 2px",
      }}
    ></div>
  );
};

export default Underline;
