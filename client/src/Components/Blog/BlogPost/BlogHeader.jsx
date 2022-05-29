import React, { useContext } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import styles from "./BlogHeader.module.css";

const BlogHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.blogHeader}>
      <h5 className={styles.blogHeaderTitle}>Blog Detail</h5>
      {user && (
        <Link className={styles.addNew} to="/admin/blog">
          <MdOutlineAddCircleOutline className={styles.addIcon} />
          <p>Add New</p>
        </Link>
      )}
    </div>
  );
};

export default BlogHeader;
