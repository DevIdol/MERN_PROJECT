import React from "react";

import styles from "./BlogView.module.css";
import BlogViewPost from "./BlogView/BlogView";
import BlogViewSideBar from "./SideBar/BlogViewSideBar";

const BlogView = () => {
  return (
    <div className={styles.blogView}>
      <BlogViewPost />
      <BlogViewSideBar />
    </div>
  );
};
export default BlogView;
