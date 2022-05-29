import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import Button from "../../screen/Button";
import axios from "axios";
import profile from "../../assets/profile.png";
import styles from "./AdminSetting.module.css";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
const AdminSetting = () => {
  const PFURL = "http://localhost:8000/images/";
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [file, setFile] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "UPDATE_STATE" });
    const updateUser = {
      userId: decodedUser._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + "--" + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profile = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        setError("Internal Server Error");
      }
    }
    try {
      const { data: res } = await axios.put(
        `/users/${decodedUser.id}`,
        updateUser
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setLoading(false);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      setMessage("User updated successfully!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        dispatch("UPDATE_FAILURE");
        setMessage("");
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/users/${decodedUser._id}`);
      navigate("/");
      setError("");
      dispatch({ type: "DELETE_USER" });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setMessage("");
        setError(error.response.data.message);
      }
    }
  };

  const showPassword = () => setShowPass(!showPass);
  useEffect(
    () => {
      window.scrollTo(0, 0);
      const identifier = setTimeout(() => {
        setFormIsValid(
          username.trim().length > 2 &&
            email.includes("@") &&
            password.trim().length > 5
        );
      }, 1000);

      return () => {
        clearTimeout(identifier);
      };
    },
    [username, email, password],
    []
  );
  return (
    <div className={styles.adminSettingContainer}>
      <div className={styles.title}>
        <h1>Update Your Account</h1>
        {decodedUser.isAdmin && <span onClick={onDelete}>Delete Account</span>}
      </div>

      <form onSubmit={handleSubmit} className={styles.settingForm}>
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
        <label htmlFor="">Profile Picture</label>
        <div className={styles.settingImg}>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : decodedUser.profile
                ? PFURL + decodedUser.profile
                : profile
            }
            alt="Pic"
          />
          <label htmlFor="fileInput">
            <BiUserCircle className={styles.settingPPIcon} />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <label htmlFor="">Username</label>
        <input
          type="text"
          value={username}
          placeholder={decodedUser.username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder={decodedUser.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className={styles.showPass}>
          <input onClick={showPassword} type="checkbox" />
          <span>Show Password</span>
        </div>
        <Button
          type="submit"
          className={styles.settingSubmit}
          disabled={!formIsValid}
        >
          {loading ? <Spinner animation="border" /> : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default AdminSetting;
