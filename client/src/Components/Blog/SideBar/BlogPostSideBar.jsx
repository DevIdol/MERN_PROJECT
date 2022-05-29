import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./BlogPostSideBar.module.css";
import { Link } from "react-router-dom";

const BlogPostSideBar = ({ catsData }) => {
  const [isActive, setIsActive] = useState("all");
  useEffect(() => {
   isActive && window.scrollTo(0, 0);
  }, [isActive]);
  return (
    <div className={styles.blogPostSideBar}>
      <Container>
        <h1 className={styles.catTitle}>Categories</h1>

        <div className={styles.catBtn}>
          <Link
            className={
              isActive === "all"
                ? `${styles.catLink} ${styles.active}`
                : styles.catLink
            }
            onClick={() => setIsActive("all")}
            to=""
          >
            All
          </Link>

          {catsData.map((cat, index) => {
            return (
              <Link
                key={index}
                onClick={() => setIsActive(cat)}
                className={
                  isActive === cat
                    ? `${styles.catLink} ${styles.active}`
                    : styles.catLink
                }
                to={`?category=${cat.toLowerCase()}`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default BlogPostSideBar;
