import React, { Fragment, useContext } from "react";
import styles from "./Blog.module.css";
import { NavLink, Outlet } from "react-router-dom";
import { postItems } from "./PostItems";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";

const Blog = () => {
  const [{ theme }] = useContext(ThemeContext);
  const activeColor = theme === "dark" ? "#65fcdb" : "#db084e";

  return (
    <Fragment>
      <div className={styles.blog}>
        {postItems.map((item) => (
          <NavLink
            className={styles.link}
            style={({ isActive }) => {
              return {
                fontWeight: isActive && 800,
                color: isActive && activeColor,
                borderBottom: isActive && `2px solid ${activeColor}`,
              };
            }}
            to={item.link}
            key={item.id}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Blog;
