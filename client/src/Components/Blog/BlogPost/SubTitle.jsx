import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./SubTitle.module.css";

const SubTitle = ({ cat, date }) => {
  return (
    <Card.Subtitle className={styles.subTitle}>
      <div className={styles.subTitleLeft}>
        <div className={styles.underline}></div>
        <h5>{cat}</h5>
      </div>
      <p className="text-muted"> {new Date(date).toDateString()}</p>
    </Card.Subtitle>
  );
};

export default SubTitle;
