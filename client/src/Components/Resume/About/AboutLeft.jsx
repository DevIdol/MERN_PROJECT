import React, { Fragment } from "react";
import me from "../../../assets/me.png";
import { Col } from "react-bootstrap";
import styles from "./AboutLeft.module.css";
import SocialMedia from "./SocialMedia";
const AboutLeft = () => {
  return (
    <Fragment>
      <Col md={6} style={{ textAlign: "center" }}>
        <div>
          <img className={styles.me} src={me} alt="" />
          <h4 className={styles.myName}>Ha Shing Thang</h4>
          <h6 className={styles.myPosition}>
            Web And Mobile Application Developer
          </h6>
          <SocialMedia />
        </div>
      </Col>
    </Fragment>
  );
};

export default AboutLeft;
