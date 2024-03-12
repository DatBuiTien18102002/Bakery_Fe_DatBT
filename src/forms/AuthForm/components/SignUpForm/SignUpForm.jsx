import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../../AuthForm.module.scss";

import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";

// import { InputField, PassField } from "../../components";
import { Button } from "@/components";
import { InputField, PassField } from "@/forms/components";

const cx = classNames.bind(styles);
const SignUpForm = ({ authProp }) => {
  const { showSignInForm, showSignUpForm, handleSubmitAuth, loadingSignUp } =
    authProp;

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống ! "),
    password: Yup.string()
      .min(6, "Mật khẩu phải tối thiểu 6 chữ số !")
      .required("Mật khẩu không được để trống !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp! ")
      .required("Nhập lại mật khẩu !"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={(values) => handleSubmitAuth(values)}
    >
      {() => {
        return (
          <Form>
            <FastField name="email" component={InputField} label="Email " />
            <FastField
              name="password"
              component={PassField}
              label="Mật khẩu "
              type="password"
            />
            <FastField
              name="confirmPassword"
              component={PassField}
              label="Nhập lại mật khẩu"
              className={cx("auth-form__input")}
              type="password"
            />

            <div className={cx("auth-form__aside")}>
              <p className={cx("auth-form__policy-text")}>
                Bằng việc đăng kí bạn đã đồng ý với Baroibeo bakery về{" "}
                <Link to={"/"} className={cx("auth-form__policy-link")}>
                  Điều khoản dịch vụ
                </Link>{" "}
                &{" "}
                <Link to={"/"} className={cx("auth-form__policy-link")}>
                  {" "}
                  Chính sách bảo mật
                </Link>
              </p>
            </div>

            <div className={cx("auth-form_controls")}>
              <Button
                type="button"
                className={cx("btn-back")}
                onClick={() => {
                  showSignUpForm(false);
                  showSignInForm(false);
                }}
              >
                Trở Lại
              </Button>

              <Button type="submit" primary disable={loadingSignUp}>
                {loadingSignUp ? "Loading..." : "Đăng ký"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

SignUpForm.propTypes = {
  authProp: PropTypes.object,
};

export default SignUpForm;
