import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getOtherSkillData } from "./OtherSkillData";
import styles from "./OtherSkill.module.css";

const OtherSkill = () => {
  const otherskill = getOtherSkillData();
  return (
    <Container>
      <Row>
        {otherskill.map((data) => {
          return (
            <Col md={6} key={data.id}>
              <h4 className={styles["skill-title"]}>{data.title}</h4>

              {data.skill.map((type) => {
                return (
                  <div className={styles["skill-content"]} key={type.id}>
                    <div>
                      <span className={styles["skill-icon"]}>{type.icon}</span>
                    </div>
                    <h6 className={styles["skill-type"]}>{type.type}</h6>
                  </div>
                );
              })}
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default OtherSkill;
