import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./SubTitle.module.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import jwt from "jwt-decode";
const SubTitle = ({ cat, onDelete, userName, handleUpdate }) => {
  const { user } = useContext(AuthContext);
  const [decodedUser, setDecodedUser] = useState();
  useEffect(() => {
    try {
      const decoded = jwt(user);
      setDecodedUser(decoded);
    } catch (error) {}
  }, [user]);
  return (
    <Card.Subtitle className={styles.subTitle}>
      <div className={styles.subTitleLeft}>
        <div className={styles.underline}></div>
        <h5>{cat}</h5>
      </div>
      {(userName === decodedUser?.username || decodedUser?.isAdmin) && (
        <div className={styles.rightSide}>
          <FaRegEdit
            size={20}
            onClick={handleUpdate}
            style={{
              color: "teal",
              marginRight: "10px",
              cursor: "pointer",
            }}
          />
          <RiDeleteBin5Line
            onClick={onDelete}
            style={{ color: "tomato", cursor: "pointer" }}
            size={20}
          />
        </div>
      )}
    </Card.Subtitle>
  );
};

export default SubTitle;
