import React from "react";
import styles from "./TextAnimation.module.css";

const TextAnimation = () => {
  return (
    <div
      className={`${styles.text} ${styles["is-animation"]} ${styles["content"]}`}
    >
      <span>W</span>
      <span>E</span>
      <span>L</span>
      <span>C</span>
      <span>O</span>
      <span>M</span>
      <span>E</span>
    </div>
  );
};

export default TextAnimation;
