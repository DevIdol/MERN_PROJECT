import React, { Fragment, useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Button from "../../screen/Button";
import styles from "./BlogTable.module.css";
import ReactLoading from "react-loading";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import jwt from "jwt-decode";
const BlogTable = ({ itemsPerPage }) => {
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const { user } = useContext(AuthContext);
  const decodedUser = jwt(user);
  let [searchParams] = useSearchParams();
  const [loadmore, setLoadmore] = useState(4);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axios.get("/posts");
        setBlogs(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reverseBlogs = blogs
    .slice(0)
    .reverse()
    .filter((blog) => {
      let category = searchParams.get("category");
      if (!category) return true;
      let cat = blog.cat.toLowerCase();
      return cat.startsWith(category.toLowerCase());
    });
  const sliceBlogs = reverseBlogs.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 2);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 2);
  };
  const isLoadmore = reverseBlogs.length > loadmore;
  const isLoadBack = loadmore > 4;

  const onDelete = async (id) => {
    const newBlogs = blogs.filter((blog) => blog._id !== id);
    setBlogs(newBlogs);
    try {
      if (decodedUser.isAdmin || decodedUser.username) {
        await axios.delete(`/posts/${id}`);
        setMessage("Post has been deleted!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        setErr("Admin only can delete!");
        setTimeout(() => {
          setErr("");
        }, 4000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setMessage("");
        setErr(error.response.data.message);
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <div className={styles.preloader}>
          <h4>Loading</h4>
          <ReactLoading
            className="preloaderIcon"
            type={"bubbles"}
            color={loadingColor}
            height={50}
            width={50}
          />
        </div>
      ) : (
        <Fragment>
          {message && (
            <p style={{ fontSize: "14px", color: "teal", paddingTop: "10px" }}>
              {message}
            </p>
          )}
          {err && (
            <p
              style={{ fontSize: "14px", color: "tomato", paddingTop: "10px" }}
            >
              {err}
            </p>
          )}
          <div className={styles.table}>
            {error && (
              <p
                style={{
                  fontSize: "14px",
                  color: "tomato",
                  paddingTop: "20px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}
            {!error && (
              <Table>
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sliceBlogs &&
                    sliceBlogs.map((blog, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{blog.username}</td>
                          <td>{blog.title}</td>
                          <td>{blog.cat}</td>
                          <td>{new Date(blog.createdAt).toDateString()}</td>
                          <td>
                            <Button
                              onClick={() => navigate(`/blog/all/${blog._id}`)}
                              disabled={
                                !(
                                  decodedUser.username === blog.username ||
                                  decodedUser.isAdmin
                                ) && true
                              }
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => onDelete(blog._id)}
                              disabled={
                                !(
                                  decodedUser.username === blog.username ||
                                  decodedUser.isAdmin
                                ) && true
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            )}
          </div>

          <div className={styles.load}>
            {isLoadBack && (
              <Button
                type="button"
                onClick={onLoadBack}
                className={styles.loadBtn}
              >
                Load Back
              </Button>
            )}
            <div />
            {isLoadmore && (
              <Button
                type="button"
                onClick={onLoadmore}
                className={styles.loadBtn}
              >
                Load More
              </Button>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default BlogTable;
