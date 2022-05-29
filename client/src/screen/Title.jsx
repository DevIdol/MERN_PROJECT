import React, { Fragment } from "react";
import Underline from "./Underline";
import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <Fragment>
      <h4 className={classes.title} >{props.title}</h4>
      <div className={classes.underline}>
        <Underline className={props.className} />
        {props.icon}
        <Underline className={props.className} />
      </div>
    </Fragment>
  );
};

export default Title;
