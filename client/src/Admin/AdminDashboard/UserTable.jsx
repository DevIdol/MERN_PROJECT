import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { Table } from "react-bootstrap";
import Button from "../../screen/Button";
import styles from "./UserTable.module.css";

import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { ThemeContext } from "../../Context/ThemeContext/ThemeContext";
import jwt from "jwt-decode";

const UserTable = () => {
  const PF = "http://localhost:8000/images/";
  const [{ theme }] = useContext(ThemeContext);
  const loadingColor = theme === "dark" ? "#65fcdb" : "#db084e";
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const decodedUser = jwt(user);
  const [message, setMessage] = useState("");
  const [err, setErr] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axios.get("/users");
        setUsers(res.data);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const onDelete = async (id) => {
    const newUsers = users.filter((user) => user._id !== id);
    try {
      await axios.delete(`/users/${id}`);
      if (decodedUser._id === id) {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      } else {
        setMessage("User has been deleted!");
        setUsers(newUsers);
        setTimeout(() => {
          setMessage();
        }, 5000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErr(error.response.data.message);
      }
    }
  };
  return (
    <Fragment>
      {loading ? (
        <div className={styles.preloader}>
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
        <div className={styles.table}>
          {message && (
            <p style={{ fontSize: "14px", color: "teal", paddingTop: "10px" }}>
              {message}
            </p>
          )}
          {err && (
            <p
              style={{ fontSize: "14px", color: "tomato", paddingTop: "10px" }}
            >
              {err}
            </p>
          )}
          {error && (
            <p
              style={{
                fontSize: "14px",
                color: "tomato",
                paddingTop: "20px",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          {!error && (
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Profile</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className={styles.profile}
                        src={data.profile ? PF + data.profile : profile}
                        alt="profile"
                      />
                    </td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                    <td>{data.isAdmin ? "Admin" : "Co-Admin"}</td>
                    <td>
                      <Button
                        onClick={() => {
                          decodedUser.id === data._id
                            ? navigate("/admin/account")
                            : setErr("It's not your account!");
                        }}
                        disabled={
                          !(
                            decodedUser.id === data._id || decodedUser.isAdmin
                          ) && true
                        }
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => onDelete(data._id)}
                        disabled={!decodedUser.isAdmin && true}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default UserTable;
