import React, { useEffect, useState } from "react";
import Card from "../../screen/Card";
import Input from "../../screen/Input";
import Button from "../../screen/Button";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import axios from "axios";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/password-reset", { email });
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
        setTimeout(() => {
          setError("");
        }, 10000);
        setMessage("");
      }
    }
    e.target.reset();
    setFormIsValid(false);
    setLoading(false);
  };
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(email.includes("@"));
    }, 1000);

    return () => clearTimeout(identifier);
  }, [email]);
  return (
    <Card className={styles.forgotPassCard}>
      <h5>Forgot Password</h5>
      {message && (
        <p style={{ fontSize: "14px", color: "teal", paddingTop: "10px" }}>
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
        <Button className={styles.button} disabled={!formIsValid}>
          {loading ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </form>
      <div className={styles.forgotPassFooter}>
        <Link className={styles.link} to="/">
          Back To Home
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPassword;
