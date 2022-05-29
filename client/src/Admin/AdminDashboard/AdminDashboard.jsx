import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Count from "./Count";
import styles from "./AdminDashboard.module.css";
import UserTable from "./UserTable";
import BlogTable from "./BlogTable";
import { Link } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";

const AdminDashboard = () => {
  const { data } = useFetch(`/posts`);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container fluid>
      <div className={styles.adminDashboard}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.container}>
          <Count blogCount={data.length} />
        </div>
        <div className={styles.userHeader}>
          <h5 className={styles.tableTitle}>User Table</h5>
          <Link
            className={styles.addNewUser}
            to="/admin/dashboard/add-new-user"
          >
            Add New User
          </Link>
        </div>
        <UserTable />
        <hr />
        <div className={styles.userHeader}>
          <h5 className={styles.tableTitle}>User Table</h5>
          <Link className={styles.addNewUser} to="/admin/blog">
            Add New Blog
          </Link>
        </div>
        <BlogTable />
      </div>
    </Container>
  );
};

export default AdminDashboard;
