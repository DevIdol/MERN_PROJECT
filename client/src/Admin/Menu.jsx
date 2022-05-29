import React from "react";
import { FaBars} from "react-icons/fa";
import styles from "./Menu.module.css";

const Menu = ({ toggleMenu, isOpen }) => {
  return (
    <div className={isOpen ? `${styles.toggle} ${styles.active}` : styles.toggle} onClick={toggleMenu}>
        <FaBars className={styles.openMenu} />
    </div>
  );
};

export default Menu;