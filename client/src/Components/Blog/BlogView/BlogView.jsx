import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ReactLoading from "react-loading";
import styles from "./BlogView.module.css";
import SubTitle from "./SubTitle";
import { Telegram, Facebook, Twitter } from "react-social-sharing";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../Context/ThemeContext/ThemeContext";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Button from "../../../screen/Button";
import { Spinner } from "react-bootstrap";
import jwt from "jwt-decode";
import CKTextEditor from "../../../Admin/TextEditor/CKTextEditor";
const BlogView = () => {
  const PF = "http://localhost:8000/images/";
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [decodedUser, setDecodedUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("");
  const [updateBlog, setUpdateBlog] = useState(false);
  const location = useLocation();
  const pathType = location.pathname.split("/")[2];
  const pathID = location.pathname.split("/")[3];
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    document.title = `DevHub | BlogView`;
    setLoading(true);
    try {
      const getPosts = async () => {
        const { data: res } = await axios.get(`/posts/${pathID}`);
        setTitle(res.data.title);
        setCat(res.data.cat);
        setDesc(res.data.desc);
        setPost(res.data);
        setLoading(false);
      };
      getPosts();
      const decoded = jwt(user);
      setDecodedUser(decoded);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
        setLoading(false);
      }
    }
  }, [pathID, user]);

  const handleDesc = (e, editor) => {
    const data = editor.getData();
    setDesc(data);
  };

  const handleUpdate = async () => {
    setLoading(true)
    try {
      if (decodedUser.isAdmin || decodedUser.username) {
        await axios.put(`/posts/${post._id}`, {
          username: decodedUser.username,
          title,
          desc,
        });
      } else {
        setError("Something Wrong!");
      }
      setLoading(false)
      setUpdateBlog(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 100000);
        setLoading(false);
      }
    }
  };

  const onDelete = async (id) => {
    try {
      if (decodedUser.isAdmin || decodedUser.username) {
        await axios.delete(`/posts/${id}`);
        navigate("/");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    !updateBlog && window.scrollTo(0, 0);
    const identifier = setTimeout(() => {
      setFormIsValid(
        title.length > 2 && cat.length > 1 && cat.length < 22 && desc.length > 5
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [title, cat, desc, updateBlog]);
  return (
    <div className={styles.blogView}>
      <Container style={{ paddingTop: "12px" }}>
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
              <h5
                style={{
                  fontSize: "14px",
                  color: "tomato",
                  paddingTop: "10px",
                }}
              >
                {error}
              </h5>
            )}
            {updateBlog ? (
              <div className={styles.editBlog}>
                <div className={styles.adminBlogFormGroup}>
                  <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    className={styles.blogInput}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={true}
                    required
                  />
                </div>

                <div className={styles.adminBlogFormGroup}>
                  <input
                    type="text"
                    placeholder="Category...(maxlength 22)"
                    value={cat}
                    className={`${styles.blogInput} ${styles.blogCat}`}
                    onChange={(e) => setCat(e.target.value)}
                    required
                  />
                </div>
                <CKTextEditor desc={desc} onChange={handleDesc} />
                <Button
                  onClick={handleUpdate}
                  type="submit"
                  className={styles.blogUpdate}
                  disabled={!formIsValid}
                >
                  {loading ? <Spinner animation="border" /> : "Update"}
                </Button>
              </div>
            ) : (
              <Col>
                <Card className={styles.card}>
                  {post.photo && (
                    <Card.Img
                      variant="top"
                      className={styles.blogImg}
                      src={PF + post.photo}
                    />
                  )}
                  <Card.Body>
                    <SubTitle
                      cat={cat}
                      handleUpdate={() => setUpdateBlog(true)}
                      onDelete={() => onDelete(post._id)}
                      userName={post.username}
                    />
                    <Card.Subtitle
                      style={{
                        paddingTop: "8px",
                        paddingBottom: "20px",
                        color: "grey",
                        fontSize: "14px",
                      }}
                    >
                      Updated On {new Date(post.createdAt).toDateString()}
                    </Card.Subtitle>
                    <Card.Title className={styles.blogTitle}>
                      {title}
                    </Card.Title>
                    <Card.Text
                      className="description"
                      dangerouslySetInnerHTML={{ __html: desc }}
                    ></Card.Text>
                  </Card.Body>
                </Card>

                <div className={styles.shareBtn}>
                  <Facebook
                    solid
                    small
                    link={`http://localhost:3000/blog/${pathType}/${pathID}`}
                  />
                  <Telegram
                    solid
                    small
                    message={post.title}
                    link={`http://localhost:3000/blog/${pathType}/${pathID}`}
                  />
                  <Twitter
                    solid
                    small
                    message={post.title}
                    link={`http://localhost:3000/blog/${pathType}/${pathID}`}
                  />
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default BlogView;
