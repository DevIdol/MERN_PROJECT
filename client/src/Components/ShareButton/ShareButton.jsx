import React from "react";
import { Telegram, Facebook, Twitter } from "react-social-sharing";
import styles from "./ShareButton.module.css";

const ShareButton = ({ message, link }) => {
  return (
    <div className={styles.shareBtn}>
      <Facebook solid small link={link} />
      <Telegram solid small message={message} link={link} />
      <Twitter solid small message={message} link={link} />
    </div>
  );
};

export default ShareButton;
