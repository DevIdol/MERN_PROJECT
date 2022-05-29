import React, { useContext } from "react";
import { RiMoonClearFill } from "react-icons/ri";
import { HiSun } from "react-icons/hi";
import styles from "./NavBarRight.module.css";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { Email, GitHub } from "../LinkIcon/LinkIcon";
const NavBarRight = () => {
  const [{ theme }, toggleTheme] = useContext(ThemeContext);
  const themeMode =
    theme === "light" ? (
      <RiMoonClearFill className={styles.themeMode} size={24} />
    ) : (
      <HiSun className={styles.themeMode} size={24} />
    );

  return (
    <div className={styles.navRight}>
      <Email className={styles.mail} size={24} />
      <GitHub className={styles.github} size={24} />
      <div onClick={toggleTheme}>{themeMode}</div>
    </div>
  );
};

export default NavBarRight;
