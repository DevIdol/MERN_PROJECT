import React from "react";
import styles from "./AboutInfo.module.css";

const AboutInfo = (props) => {
  return (
    <div className={styles.aboutInfo}>
      <div>
        <span className={styles.icon}>{props.icon}</span>
      </div>
      <div>
        <a
          href={props.href}
          target={props.target}
          rel={props.rel}
          className={styles.content}
        >
          {props.content}
        </a>
      </div>
    </div>
  );
};

export default AboutInfo;
