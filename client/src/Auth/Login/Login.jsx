import React, { useEffect, useState, useContext } from "react";
import Card from "../../screen/Card";
import Input from "../../screen/Input";
import Button from "../../screen/Button";
import { Spinner } from "react-bootstrap";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axios from "axios";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setLoading(true);
    try {
      const { data: res } = await axios.post("auth/login", {
        email,
        password,
      });
      navigate("/admin/dashboard");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      setError("");
      setLoading(false);
      setMessage(res.message);
      setTimeout(() => {
        setMessage("");
      }, 10000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        dispatch("LOGIN_FAILURE");
        setMessage("");
        setLoading(false);
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
    e.target.reset();
    setLoading(false);
    setFormIsValid(false);
    setShowPass(false);
  };

  const showPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(email.includes("@") && password.trim().length > 5);
    }, 1000);

    return () => clearTimeout(identifier);
  }, [email, password]);

  return (
    <Card className={styles.loginCard}>
      <h2>Login</h2>
      {message && (
        <p style={{ fontSize: "14px", color: "tomato", paddingTop: "10px" }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ fontSize: "14px", color: "tomato", paddingTop: "10px" }}>
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <Input
          className={styles.input}
          placeholder="Enter Your Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <Input
          className={styles.input}
          placeholder="Enter Your Password"
          type={showPass ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.showPass}>
          <input onClick={showPassword} type="checkbox" />
          <span>Show Password</span>
        </div>
        <Button className={styles.button} disabled={!formIsValid}>
          {loading ? <Spinner animation="border" /> : "Login"}
        </Button>
      </form>
      <div className={styles.loginFooter}>
        <Link className={styles.link} to="/forgot-password">
          Forgot Password
        </Link>
        <Link className={styles.link} to="/register">
          Go To Register
        </Link>
      </div>
    </Card>
  );
};

export default Login;
