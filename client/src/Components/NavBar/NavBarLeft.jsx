import React from "react";
import styles from "./NavBarLeft.module.css";
const NavBarLeft = () => {
  return (
    <div className={styles.logo}>
      <h1 className={styles.dev}>DevHub</h1>
      <span>MM</span>
    </div>
  );
};

export default NavBarLeft;
