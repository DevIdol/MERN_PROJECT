import React from "react";
import AboutLeft from "./AboutLeft";
import { Container, Row } from "react-bootstrap";
import styles from "./About.module.css";
import AboutRight from "./AboutRight";
import TextAnimation from "./TextAnimation";
const About = () => {
  return (
    <section className={styles.aboutSection} id="home">
      <TextAnimation />
      <Container>
        <Row>
          <AboutLeft />
          <AboutRight />
        </Row>
      </Container>
    </section>
  );
};

export default About;
