import React, { Fragment } from "react";
import NavBarCenter from "./NavBarCenter";
import NavBarLeft from "./NavBarLeft";
import NavBarRight from "./NavBarRight";
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <Fragment>
      <nav className={styles.nav}>
        <NavBarLeft />
        <NavBarCenter />
        <NavBarRight />
      </nav>
    </Fragment>
  );
};

export default NavBar;
