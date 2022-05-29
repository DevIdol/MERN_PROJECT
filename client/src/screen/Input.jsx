import React from "react";
import styles from "./Input.module.css";

const Input = ({ type, className,onChange, placeholder, value, name }) => (
  <input
    type={type || "text"}
    className={`${styles.input} ${className}`}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    name={name}
    required
  />
);

export default Input;
