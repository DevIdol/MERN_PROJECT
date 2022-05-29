import React, { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SubTitle from "./SubTitle";
import { Spinner } from "react-bootstrap";
import styles from "./AllPost.module.css";
import ReactLoading from "react-loading";
import BlogPostSideBar from "../SideBar/BlogPostSideBar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Button from "../../../screen/Button";
import useFetch from "../../../Hooks/UseFetch";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import BlogHeader from "./BlogHeader";
const SoftwarePost = () => {
  const PF = "http://localhost:8000/images/";
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  let [searchParams] = useSearchParams();
  const { search } = useLocation();
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(2);
  const softwareFilter = data.filter(
    (software) => software.type === "Software"
  );
  const reverseSoftware = softwareFilter
    .slice(0)
    .reverse()
    .filter((software) => {
      let category = searchParams.get("category");
      if (!category) return true;
      let cat = software.cat.toLowerCase();
      return cat.startsWith(category.toLowerCase());
    });
  const sliceSoftware = reverseSoftware.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 2);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 2);
  };
  const isLoadmore = reverseSoftware.length > loadmore;
  const isLoadBack = loadmore > 2;
  const arrCats = softwareFilter.map((cat) => cat.cat);
  const catsSet = new Set(arrCats);
  const catsData = [...catsSet];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <div className={styles.blogPost}>
        <Container>
        <BlogHeader/>
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
                    paddingTop: "10px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
              {sliceSoftware.map((software, index) => {
                return (
                  <Col key={index} md={6}>
                    <Card className={styles.card}>
                    {software.photo && <Card.Img variant="top" src={PF + software.photo} />}
                      <Card.Body>
                        <SubTitle
                          cat={software.cat}
                          date={software.createdAt}
                        />
                        <Link to={`/blog/software/${software._id}`}>
                          <Card.Title className={styles.blogTitle}>
                            {software.title}
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

export default SoftwarePost;
