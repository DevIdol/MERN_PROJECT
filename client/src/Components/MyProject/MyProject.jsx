import React, { useEffect, useState } from "react";
import { RiMedalFill } from "react-icons/ri";
import { Container } from "react-bootstrap";
import Button from "../../screen/Button";
import Title from "../../screen/Title";
import AllProject from "./AllProject";
import styles from "./MyProject.module.css";
import MobileProject from "./MobileProject";
import WebProject from "./WebProject"

const MyProject = () => {
  const [projects, setProjects] = useState(<AllProject />);
  const [isActive, setIsActive] = useState("all");
  useEffect(()=>{
    document.title ="DevHub | Projects"
  }, [])
  return (
    <div style={{ paddingTop: "90px", textAlign: "center" }}>
      <Title
        title="My Projects"
        icon={<RiMedalFill className={styles.icon} />}
        className={styles.underline}
      />
      <Button
        onClick={() => {
          setProjects(<AllProject />);
          setIsActive("all");
        }}
        className={
          isActive === "all" ? `${styles.btn} ${styles.active}` : styles.btn
        }
      >
        All
      </Button>
      <Button
        onClick={() => {
          setProjects(<MobileProject />);
          setIsActive("mobile");
        }}
        className={
          isActive === "mobile" ? `${styles.btn} ${styles.active}` : styles.btn
        }
      >
        Mobile
      </Button>
      <Button
        onClick={() => {
          setProjects(<WebProject/>)
          setIsActive("web");
        }}
        className={
          isActive === "web" ? `${styles.btn} ${styles.active}` : styles.btn
        }
      >
        Web
      </Button>
      <Container style={{ paddingBottom: "100px" }}>{projects}</Container>
    </div>
  );
};

export default MyProject;
