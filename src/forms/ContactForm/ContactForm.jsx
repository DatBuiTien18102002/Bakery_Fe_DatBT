import { useRef, useState } from "react";
import classNames from "classnames/bind";
import { FastField, Formik, Form } from "formik";
import emailjs from "@emailjs/browser";

import styles from "./ContactForm.module.scss";
import { InputField } from "@/forms/components";
import { Button } from "@/components";
import { validateContact } from "@/forms/validateSchema";
import message from "@/utils/message";

const cx = classNames.bind(styles);

const ContactForm = () => {
  const initialUser = {
    name: "",
    email: "",
    message: "",
  };

  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleUserForm = () => {
    setLoading(true);
    emailjs
      .sendForm(
        import.meta.env.VITE_REACT_EMAIL_SERVICE_ID,
        import.meta.env.VITE_REACT_EMAIL_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_REACT_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setLoading(false);
          message("success", "Gửi thành công");
        },
        (error) => {
          setLoading(false);
          message("error", error.text);
        }
      );
  };

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={validateContact}
      onSubmit={(values) => handleUserForm(values)}
    >
      {() => {
        return (
          <Form ref={formRef}>
            <div className={cx("auth-form__wrapper-form")}>
              <FastField name="name" component={InputField} label="Name" />
              <FastField name="email" component={InputField} label="Email " />
              <FastField
                name="message"
                component={InputField}
                label="Message"
                multiline
                rows={3}
              />
              <div className={cx("contact-form_controls")}>
                <Button
                  className={cx("contact-form_button")}
                  type="submit"
                  primary
                  rounded
                  disable={loading}
                >
                  {loading === true ? "Loading..." : "Gửi"}
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactForm;
