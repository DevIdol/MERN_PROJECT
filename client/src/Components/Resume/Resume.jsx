import React, { Fragment, useEffect } from "react";
import About from "./About/About";
import Contact from "./Contact/Contact";
import Technical from "./Technical/Technical";

const Home = () => {
  useEffect(() => {
    document.title = "DevHub | Resume";
  }, []);
  return (
    <Fragment>
      <About />
      <Technical />
      <Contact />
    </Fragment>
  );
};

export default Home;
