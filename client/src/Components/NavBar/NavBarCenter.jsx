import React, { Fragment, useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { getNavBarList } from "./NavBarList";
import styles from "./NavBarCenter.module.css";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
const NavBarCenter = () => {
  const [isActive, setIsActive] = useState("");
  const { user } = useContext(AuthContext);
  const items = getNavBarList();
  const [{ theme }] = useContext(ThemeContext);
  const activeColor = theme === "dark" ? "#65fcdb" : "#db084e";
  return (
    <Fragment>
      <ul className={styles.items}>
        {items.map((item) => {
          return (
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive && 800,
                  color: isActive && activeColor,
                };
              }}
              onClick={() => setIsActive(item.name)}
              className={
                isActive === item.name
                  ? `${styles.item} ${styles.active}`
                  : styles.item
              }
              to={item.link}
              key={item.id}
            >
              {item.name}
            </NavLink>
          );
        })}

        {user && (
          <NavLink
            style={({ isActive }) => {
              return {
                fontWeight: isActive && 800,
                color: isActive && activeColor,
              };
            }}
            onClick={() => setIsActive("Admin")}
            className={
              isActive === "Admin"
                ? `${styles.item} ${styles.active}`
                : styles.item
            }
            to="/admin/dashboard"
          >
            Admin
          </NavLink>
        )}
      </ul>
      <Outlet />
    </Fragment>
  );
};

export default NavBarCenter;
