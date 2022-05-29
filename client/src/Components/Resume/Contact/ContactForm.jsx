import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Input from "../../../screen/Input";
import Button from "../../../screen/Button"
import styles from "./ContactForm.module.css";
const ContactForm = () => {
  const [successAlt, setSuccessAlt] = useState(undefined);
  const [errorAlt, setErrorAlt] = useState(undefined);

  const handleForm = useRef();
  const onSubmitEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qc9qyid",
        "template_u1hmpi5",
        handleForm.current,
        "xb9SX1IiNXCEYTS3c"
      )
      .then(
        (result) => {
          result && setSuccessAlt(true);
          result &&
            setTimeout(() => {
              setSuccessAlt(false);
            }, 3200);
        },
        (error) => {
          error && setErrorAlt(true);
          error &&
            setTimeout(() => {
              setErrorAlt(false);
            }, 3200);
        }
      );
    e.target.reset();
  };

  return (
    <div className={styles["contact-form"]}>
      <form className={styles.form} ref={handleForm} onSubmit={onSubmitEmail}>
        {successAlt && <h3 style={{color: "teal"}}>Success!</h3> }
        {errorAlt && <h3 color={{color: "red"}}>Error!</h3>}

        <Input
          className={styles["input-form"]}
          type="text"
          name="name"
          placeholder="Enter Your Name"
        />
        <Input
          className={styles["input-form"]}
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Enter Your Message"
          rows="6"
          required
        />
        <Button className={styles.button} type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default ContactForm;
