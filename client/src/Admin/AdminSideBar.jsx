import React, { Fragment, useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Menu from "./Menu";
import { adminSideBarItem } from "./AdminSideBarItem";
import styles from "./AdminSideBar.module.css";
import profile from "../assets/profile.png";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { ThemeContext } from "../Context/ThemeContext/ThemeContext";
import jwt from "jwt-decode";
const AdminSideBar = () => {
  const PFURL = "http://localhost:8000/images/";
  const { user, dispatch } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const [{ theme }] = useContext(ThemeContext);
  const activeColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const activeBackground =
    theme === "dark" ? "rgba(0,0,0,0.5)" : "rgba(224, 217, 217, 0.5)";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <Fragment>
      {user && (
        <Fragment>
          {isOpen && (
            <div onClick={closeMenu} className={styles.overflow}></div>
          )}
          <Menu toggleMenu={toggleMenu} isOpen={isOpen} />
          <div
            className={
              isOpen
                ? `${styles.adminSideBar} ${styles.active}`
                : styles.adminSideBar
            }
          >
            <Link to="/admin/account" className={styles.adminSideBarHeader}>
              <div className={styles.adminSideBarHeaderTop}>
                <img
                  src={
                    decodedUser.profile ? PFURL + decodedUser.profile : profile
                  }
                  className={styles.me}
                  alt=""
                />
                <h6 className={styles.adminName}>{decodedUser.username}</h6>
              </div>
              <p className={styles.adminMail}>{decodedUser.email}</p>
            </Link>

            {adminSideBarItem.map((item) => (
              <NavLink
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive && 800,
                    color: isActive && activeColor,
                    backgroundColor: isActive && activeBackground,
                    width: isActive && 200,
                    borderRadius: isActive && 10,
                  };
                }}
                onClick={closeMenu}
                to={item.link}
                className={styles.item}
                key={item.id}
              >
                <span className={styles.adminSideBarIcon}>{item.icon}</span>{" "}
                {item.name}
              </NavLink>
            ))}
            <Link to="/" onClick={handleLogout} className={styles.item}>
              <span className={styles.adminSideBarIcon}>
                <FiLogOut />
              </span>{" "}
              Logout
            </Link>
          </div>
          <Outlet />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminSideBar;
