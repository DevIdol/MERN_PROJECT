import axios from "axios";
import React, { useState, useEffect, Fragment, useContext } from "react";
import ReactLoading from "react-loading";
import { Link, useParams } from "react-router-dom";
import Button from "../../screen/Button";
import classes from "./EmailVerify.module.css";
import success from "../../assets/success.png";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
const EmailVerify = () => {
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const param = useParams();
  useEffect(() => {
    setLoading(true);
    const verifyEmailUrl = async () => {
      try {
        const { data } = await axios.get(
          `/users/${param.id}/verify/${param.token}`
        );
        setLoading(false);
        setMsg(data.message);
        setError("");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setLoading(false);
          setError(error.response.data.message);
          setMsg("");
        }
      }
    };
    verifyEmailUrl();
  }, [param]);
  return (
    <Fragment>
      {loading ? (
        <div id="preloader">
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
          {msg && (
            <div className={classes.container}>
              <img
                src={success}
                alt="success_img"
                className={classes.successImg}
              />
              <h1>{msg}</h1>
              <Link to="/login">
                <Button className={classes.loginLink} type="text">
                  Login
                </Button>
              </Link>
            </div>
          )}
          {error && (
            <h2 className="text-center" style={{ paddingTop: "140px" }}>
              {error}
            </h2>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default EmailVerify;
