/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";
import styles from "./BlogViewSideBar.module.css";
import img from "../../../assets/img.jpg";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import useFetch from "../../../Hooks/UseFetch";
import Button from "../../../screen/Button";
const BlogPostSideBar = () => {
  const { search } = useLocation();
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(2);
  const reverseBlogs = data.slice(0).reverse();

  const sliceBlogs = reverseBlogs.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 2);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 2);
  };
  const isLoadmore = reverseBlogs.length > loadmore;
  const isLoadBack = loadmore > 2;
  return (
    <div className={styles.blogViewSideBar}>
      <Container style={{ marginTop: "10px" }}>
        <h1 className={styles.title}>Latest Blog</h1>
        {error && (
          <p
            style={{
              fontSize: "18px",
              color: "tomato",
              paddingTop: "40px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}
        <Row>
          {sliceBlogs.map((blog, index) => {
            return (
              <Col key={index} md={12} className={styles.blog}>
                <img className={styles.blogImg} src={img} alt="blog-img..." />
                <div className={styles.blogLeft}>
                  <div className={styles.subTitle}>
                    <div className={styles.subTitleLeft}>
                      <div className={styles.underline}></div>
                      <h5>{blog.cat}</h5>
                    </div>
                    <p className="text-muted" style={{ fontSize: "12px" }}>
                      {new Date(blog.createdAt).toDateString()}
                    </p>
                  </div>
                  <Link
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    to={`/blog/all/${blog._id}`}
                  >
                    <h5 className={styles.blogTitle}>{blog.title}</h5>
                  </Link>
                  <div className={styles.subTitleLeft}>
                    <img src={img} className={styles.profile} alt="admin" />
                    <h5
                      className="text-muted"
                      style={{ paddingLeft: "4px", paddingTop: "2px" }}
                    >
                      {blog.username}
                    </h5>
                  </div>
                </div>
              </Col>
            );
          })}
           <div className={styles.load}>
                {isLoadBack && (
                  <Button
                    type="button"
                    onClick={onLoadBack}
                    className={styles.loadBtn}
                  >
                    {loading ? <Spinner animation="border" /> : "Load Back"}
                  </Button>
                )}

                {isLoadmore && (
                  <Button
                    type="button"
                    onClick={onLoadmore}
                    className={styles.loadBtn}
                  >
                    {loading ? <Spinner animation="border" /> : "Load More"}
                  </Button>
                )}
              </div>
        </Row>
      </Container>
    </div>
  );
};

export default BlogPostSideBar;
