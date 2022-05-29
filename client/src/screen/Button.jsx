import React from "react";
import styles from "./Button.module.css";
const Button = ({ type, className, onClick, disabled, children }) => {
  return (
    <button
      type={type || "submit"}
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
