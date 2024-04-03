import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Formik, Form, FastField } from "formik";
import { Link } from "react-router-dom";
import { InputField, PassField } from "@/forms/components";
import { Button } from "@/components";

import styles from "../../AuthForm.module.scss";
import { validateSignIn } from "@/forms/validateSchema";

const cx = classNames.bind(styles);
const SignInForm = ({ authProp }) => {
  const { showSignInForm, showSignUpForm, handleSubmitAuth, loadingSignIn } =
    authProp;

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSignIn}
      onSubmit={async (values) => await handleSubmitAuth(values)}
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

            <div className={cx("auth-form__aside")}>
              <div className={cx("auth-form__help")}>
                <Link
                  to="/"
                  className={cx("auth-form__link ", "auth-form__forgot")}
                >
                  Quên mật khẩu
                </Link>
                <span className={cx("auth-form__separate")}></span>
                <Link to="/" className={cx("auth-form__link")}>
                  Cần trợ giúp ?
                </Link>
              </div>
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

              <Button type="submit" primary disable={loadingSignIn}>
                {loadingSignIn ? "Loading..." : "Đăng Nhập"}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

SignInForm.propTypes = {
  authProp: PropTypes.object,
};

export default SignInForm;
