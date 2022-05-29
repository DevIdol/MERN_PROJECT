import React from "react";
import styles from "./NavBarLeft.module.css";
const NavBarLeft = () => {
  return (
    <div className={styles.logo}>
      <h1 className={styles.dev}>Dev</h1>
      <h1 className={styles.hub}>Hub</h1>
      <span>MM</span>
    </div>
  );
};

export default NavBarLeft;
