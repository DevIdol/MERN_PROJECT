import React, { Fragment } from "react";
import {
  Facebook,
  Instagram,
  Telegram,
  Twitter,
} from "../../LinkIcon/LinkIcon";

import styles from "./SocialMedia.module.css";

const SocialMedia = () => {
  return (
    <Fragment>
      <Facebook className={styles.facebook} size={24} />
      <Instagram className={styles.instagram} size={24} />
      <Twitter className={styles.twitter} size={24} />
      <Telegram className={styles.telegram} size={24} />
    </Fragment>
  );
};

export default SocialMedia;
