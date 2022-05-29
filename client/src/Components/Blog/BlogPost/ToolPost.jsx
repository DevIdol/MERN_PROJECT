import React, { Fragment, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SubTitle from "./SubTitle";
import styles from "./AllPost.module.css";
import { Spinner } from "react-bootstrap";
import ReactLoading from "react-loading";
import BlogPostSideBar from "../SideBar/BlogPostSideBar";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Button from "../../../screen/Button";
import useFetch from "../../../Hooks/UseFetch";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import BlogHeader from "./BlogHeader";
const ToolPost = () => {
  const PF = "http://localhost:8000/images/";
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  let [searchParams] = useSearchParams();
  const { search } = useLocation();
  const { data, loading, error } = useFetch(`/posts` + search);
  const [loadmore, setLoadmore] = useState(2);
  const toolsFilter = data.filter(
    (tool) => tool.type === "Installation & Tool"
  );
  const reverseTools = toolsFilter
    .slice(0)
    .reverse()
    .filter((tool) => {
      let category = searchParams.get("category");
      if (!category) return true;
      let cat = tool.cat.toLowerCase();
      return cat.startsWith(category.toLowerCase());
    });
  const sliceTools = reverseTools.slice(0, loadmore);
  const onLoadmore = () => {
    setLoadmore((preValue) => preValue + 2);
  };
  const onLoadBack = () => {
    setLoadmore((preValue) => preValue - 2);
  };
  const isLoadmore = reverseTools.length > loadmore;
  const isLoadBack = loadmore > 2;
  const arrCats = toolsFilter.map((cat) => cat.cat);
  const catsSet = new Set(arrCats);
  const catsData = [...catsSet];
  useEffect(() => {
    document.title = "DevHub | Installation & Tool"
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
              {sliceTools.map((tool, index) => {
                return (
                  <Col key={index} md={6}>
                    <Card className={styles.card}>
                      {tool.photo && (
                        <Card.Img variant="top" src={PF + tool.photo} />
                      )}
                      <Card.Body>
                        <SubTitle cat={tool.cat} date={tool.createdAt} />
                        <Link to={`/blog/installation&tool/${tool._id}`}>
                          <Card.Title className={styles.blogTitle}>
                            {tool.title}
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

export default ToolPost;
