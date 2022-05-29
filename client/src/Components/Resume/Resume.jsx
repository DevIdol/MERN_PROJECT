import React, { Fragment } from "react";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Technical from "./Technical/Technical";

const Home = () => {
  return (
    <Fragment>
      <About />
      <Technical />
      <Contact />
    </Fragment>
  );
};

export default Home;
