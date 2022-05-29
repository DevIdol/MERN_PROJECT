import React from "react";
import { Container } from "react-bootstrap";
import styles from "./AddNewUser.module.css";
import AddUserInput from "./AddUserInput";
const AddNewUser = () => {
  return (
    <Container fluid>
      <div className={styles.adminDashboard}>
        <div className={styles.title}>
          <h1>Add New User</h1>
        </div>
        <AddUserInput />
      </div>
    </Container>
  );
};

export default AddNewUser;
