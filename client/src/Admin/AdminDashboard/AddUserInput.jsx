import React, { Fragment, useEffect, useState } from "react";
import profileImg from "../../assets/profile.png";
import styles from "./AddUserInput.module.css";
import { RiFileUploadLine } from "react-icons/ri";
import Input from "../../screen/Input";
import Button from "../../screen/Button";
import { Spinner } from "react-bootstrap";
import axios from "axios";
const AddUserInput = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const showPassword = () => {
    setShowPass(!showPass);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      const filename = Date.now() + "--" + file.name;
      data.append("name", filename);
      data.append("file", file);
      const profile = filename;
      await axios.post("/upload", data);
      await axios.post("/auth/register", {
        username,
        email,
        password,
        profile,
      });
      setError("");
      setLoading(false);
      setMessage("User added successfully!");
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
        setError("Internet Connection Fail...!");
        console.log(error.response.data.message)
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
        username.length > 1 && email.includes("@") && password.trim().length > 5
      );
    }, 1000);

    return () => clearTimeout(identifier);
  }, [username, email, password]);
  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        style={{ textAlign: "center", paddingTop: "40px" }}
      >
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
        <div className={styles.addUserForm}>
          <div className={styles.addUserLeft}>
            <img
              className={styles.profile}
              src={file ? URL.createObjectURL(file) : profileImg}
              alt="profile"
            />
            <label htmlFor="fileInput">
              Profile: <RiFileUploadLine className={styles.icon} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className={styles.addUserRight}>
            <label>Username</label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Username"
              type="text"
            />
            <label>Email</label>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email"
              type="email"
            />
            <label>Password</label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              type={showPass ? "text" : "password"}
            />
            <div className={styles.showPass}>
              <input onClick={showPassword} type="checkbox" />
              <span>Show Password</span>
            </div>
          </div>
        </div>

        <Button className={styles.button} disabled={!formIsValid}>
          {loading ? <Spinner animation="border" /> : "Submit"}
        </Button>
      </form>
    </Fragment>
  );
};

export default AddUserInput;
