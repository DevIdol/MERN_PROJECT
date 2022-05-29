import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Spinner } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import SubTitle from "./SubTitle";
import styles from "./AllPost.module.css";
import BlogPostSideBar from "../SideBar/BlogPostSideBar";
import ReactLoading from "react-loading";
import Button from "../../../screen/Button";
import useFetch from "../../../Hooks/UseFetch";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import BlogHeader from "./BlogHeader";
const AllPost = () => {
  const PF = "http://localhost:8000/images/";
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  let [searchParams] = useSearchParams();
  const { search } = useLocation();
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(2);
  const arrCats = data.map((cat) => cat.cat);
  const catsSet = new Set(arrCats);
  const catsData = [...catsSet];
  const reverseBlogs = data
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
  const isLoadBack = loadmore > 2;
  useEffect(() => {
    document.title = "DevHub | All Blog"
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <div className={styles.blogPost}>
        <Container>
          <BlogHeader />
          {loading ? (
            <div className={styles.preloader}>
              <h3>Loading</h3>
              <ReactLoading
                className="preloaderIcon"
                type={"bubbles"}
                color={loadingColor}
                height={50}
                width={50}
              />
            </div>
          ) : (
            <Row>
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
              {sliceBlogs.map((blog, index) => {
                return (
                  <Col key={index} md={6}>
                    <Card className={styles.card}>
                      {blog.photo && (
                        <Card.Img
                          className={styles.blogImg}
                          variant="top"
                          src={PF + blog.photo}
                        />
                      )}
                      <Card.Body>
                        <SubTitle cat={blog.cat} date={blog.createdAt} />
                        <Link to={`/blog/all/${blog._id}`}>
                          <Card.Title className={styles.blogTitle}>
                            {blog.title}
                          </Card.Title>
                        </Link>
                      </Card.Body>
                    </Card>
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
          )}
        </Container>
      </div>
      <BlogPostSideBar catsData={catsData} />
    </Fragment>
  );
};

export default AllPost;
