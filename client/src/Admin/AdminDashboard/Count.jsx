import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaBlog, FaUser } from "react-icons/fa";
import { SiPolymerproject } from "react-icons/si";
import { BsEyeFill } from "react-icons/bs";
import Card from "../../screen/Card";
import styles from "./Count.module.css";
import useFetch from "../../Hooks/UseFetch";

const Count = ({ blogCount }) => {
  const [visitCount, setVisitCount] = useState(0);
  const { data } = useFetch("/users");
  useEffect(() => {
    fetch(
      "https://api.countapi.xyz/update/devidol.mm.com/7d47613d-b024-479b-bea6-e098f9bc053b/?amount=1"
    )
      .then((res) => res.json())
      .then((res) => {
        setVisitCount(res.value);
      });
  }, []);
  return (
    <Row className={styles.row}>
      <Col md={3}>
        <Card className={styles.card}>
          <FaUser className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Admin Count</h3>
            <Card className={styles.cardCount}>{data.length}</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <FaBlog className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Blog Count</h3>
            <Card className={styles.cardCount}>{blogCount}</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <SiPolymerproject className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Project Count</h3>
            <Card className={styles.cardCount}>7</Card>
          </div>
        </Card>
      </Col>
      <Col md={3}>
        <Card className={styles.card}>
          <BsEyeFill className={styles.icon} />
          <div className={styles.rightSide}>
            <h3>Visit Count</h3>
            <Card className={styles.cardCount}>{visitCount}</Card>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Count;
