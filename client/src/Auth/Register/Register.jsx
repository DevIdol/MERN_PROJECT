import React, { useEffect, useState } from "react";
import Card from "../../screen/Card";
import Input from "../../screen/Input";
import Button from "../../screen/Button";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const showPassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: res } = await axios.post("/auth/register", {
        username,
        email,
        password,
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
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        username.length > 1 &&
          email.includes("@") &&
          password.trim().length > 5 &&
          password === confirmPassword
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [username, email, password, confirmPassword]);

  return (
    <Card className={styles.registerCard}>
      <h2>Register</h2>
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
        <label>Username</label>
        <Input
          className={styles.input}
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <Input
          className={styles.input}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
          {loading ? <Spinner animation="border" /> : "Register"}
        </Button>
      </form>
      <div className={styles.registerFooter}>
        <Link className={styles.link} to="/login">
          Go To Login
        </Link>
      </div>
    </Card>
  );
};

export default Register;
