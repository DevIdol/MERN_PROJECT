import React from "react";
import styles from "./Contact.module.css";
import ContactTitle from "./ContactTitle";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section className={`${styles["contact-section"]}`}>
      <ContactTitle/>
      <ContactForm />
    </section>
  );
};

export default Contact;
