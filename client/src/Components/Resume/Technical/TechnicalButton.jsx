import React, { Fragment, useState } from "react";
import Button from "../../../screen/Button";
import BackEnd from "./BackEnd";
import FrontEnd from "./FrontEnd";
import OtherSkill from "./OtherSkill";
import styles from "./TechnicalButton.module.css";

const TechnicalButton = () => {
  const [skill, setSkill] = useState(<FrontEnd />);
  const [isActive, setIsActive] = useState("front");
  return (
    <Fragment>
      <div className={styles.btn}>
        <Button
          className={
            isActive === "front"
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => {
            setSkill(<FrontEnd />);
            setIsActive("front");
          }}
        >
          FrontEnd
        </Button>
        <Button
          className={
            isActive === "back"
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => {
            setSkill(<BackEnd />);
            setIsActive("back");
          }}
        >
          BackEnd
        </Button>
        <Button
          className={
            isActive === "other"
              ? `${styles.button} ${styles.active}`
              : styles.button
          }
          onClick={() => {
            setSkill(<OtherSkill />);
            setIsActive("other");
          }}
        >
          Other
        </Button>
      </div>
      <div>{skill}</div>
    </Fragment>
  );
};

export default TechnicalButton;
