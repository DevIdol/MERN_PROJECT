import React, { useEffect, useState, Fragment, useContext } from "react";
import Card from "../../screen/Card";
import Input from "../../screen/Input";
import Button from "../../screen/Button";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./ResetPassword.module.css";
import ReactLoading from "react-loading";
import axios from "axios";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
const ResetPassword = () => {
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = `/password-reset/${param.id}/${param.token}`;
  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        console.log(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(url, {
        password,
      });
      setLoading(false);
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 10000);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false);
        setError(error.response.data.message);
        setMessage("");
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
    e.target.reset();
    setFormIsValid(false);
    setShowPass(false);
    setLoading(false);
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        password.trim().length > 5 && password === confirmPassword
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [password, confirmPassword]);
  return (
    <Fragment>
      {loading ? (
        <div id="preloader">
          <h1>Loading</h1>
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
          {validUrl ? (
            <Card className={styles.resetPassCard}>
              <h2>Reset Password</h2>
              {message && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "teal",
                    paddingTop: "10px",
                  }}
                >
                  {message}
                </p>
              )}
              {error && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "tomato",
                    paddingTop: "10px",
                  }}
                >
                  {error}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <label>Password</label>
                <Input
                  className={styles.input}
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <Input
                  className={styles.input}
                  placeholder="Confirm Password"
                  type={showPass ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className={styles.showPass}>
                  <input onClick={showPassword} type="checkbox" />
                  <span>Show Password</span>
                </div>
                <Button className={styles.button} disabled={!formIsValid}>
                  {loading ? <Spinner animation="border" /> : "Submit"}
                </Button>
              </form>
              <div className={styles.resetPassFooter}>
                <Link className={styles.link} to="/">
                  Back To Home
                </Link>
                <span
                  className={styles.link}
                  onClick={() => navigate("/login")}
                >
                  Go To Login
                </span>
              </div>
            </Card>
          ) : (
            <h1 className="text-center" style={{ paddingTop: "140px" }}>
              404 Not Found!!
            </h1>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResetPassword;
