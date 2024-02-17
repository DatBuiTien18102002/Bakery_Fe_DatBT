import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AuthForm.module.scss";

import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import InputField from "./InputField/InputField.jsx";
import { Link } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button } from "@/components";
import PassField from "./PasswordField/PassField.jsx";

const cx = classNames.bind(styles);
const AuthForm = (props) => {
  const { signIn, signUp, showSignInForm, showSignUpForm } = props;

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
    <div className={cx("modal")}>
      <div className={cx("modal__overlay")}>
        <div className={cx("modal__body")}>
          <div className={cx("auth-form")}>
            <div className={cx("auth-form__container")}>
              <div className={cx("auth-form__header")}>
                <div className={cx("auth-form__heading")}>
                  {signIn ? "Đăng nhập" : "Đăng ký"}
                </div>
                <div
                  className={cx("auth-form__switch-btn")}
                  onClick={() => {
                    if (signIn) {
                      showSignInForm(false);
                      showSignUpForm(true);
                    } else {
                      showSignInForm(true);
                      showSignUpForm(false);
                    }
                  }}
                >
                  {signIn ? "Đăng ký" : "Đăng nhập"}
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
              >
                {(formikProps) => {
                  const { values, errors, touched } = formikProps;
                  console.log({ values, errors, touched });
                  return (
                    <Form>
                      <FastField
                        name="email"
                        component={InputField}
                        label="Email "
                      />
                      <FastField
                        name="password"
                        component={PassField}
                        label="Mật khẩu "
                        type="password"
                      />
                      {signUp ? (
                        <FastField
                          name="confirmPassword"
                          component={PassField}
                          label="Nhập lại mật khẩu"
                          className={cx("auth-form__input")}
                          type="password"
                        />
                      ) : (
                        <></>
                      )}

                      <div className={cx("auth-form__aside")}>
                        {signUp ? (
                          <p className={cx("auth-form__policy-text")}>
                            Bằng việc đăng kí bạn đã đồng ý với Baroibeo bakery
                            về{" "}
                            <Link
                              to={"/"}
                              className={cx("auth-form__policy-link")}
                            >
                              Điều khoản dịch vụ
                            </Link>{" "}
                            &{" "}
                            <Link
                              to={"/"}
                              className={cx("auth-form__policy-link")}
                            >
                              Chính sách bảo mật
                            </Link>
                          </p>
                        ) : (
                          <div className={cx("auth-form__help")}>
                            <Link
                              to="/"
                              className={cx(
                                "auth-form__link ",
                                "auth-form__forgot"
                              )}
                            >
                              Quên mật khẩu
                            </Link>
                            <span className={cx("auth-form__separate")}></span>
                            <Link to="/" className={cx("auth-form__link")}>
                              Cần trợ giúp ?
                            </Link>
                          </div>
                        )}
                      </div>

                      <div className={cx("auth-form_controls")}>
                        <Button
                          type="button"
                          className={cx("btn-back")}
                          onClick={() => {
                            if (signUp) {
                              showSignUpForm(false);
                            } else {
                              showSignInForm(false);
                            }
                          }}
                        >
                          Trở Lại
                        </Button>
                        {signUp ? (
                          <Button className={cx("btn-register")} primary>
                            Đăng ký
                          </Button>
                        ) : (
                          <Button className={cx("btn-register")} primary>
                            Đăng nhập
                          </Button>
                        )}
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
            <div className={cx("auth-form__socials")}>
              <a
                href="https://www.facebook.com/"
                className={cx(
                  "auth-form__socials--link",
                  "auth-form__socials--fb"
                )}
              >
                <div className={cx("auth-form__socials--wrapper")}>
                  <FacebookIcon
                    sx={{ fontSize: 20, marginRight: "" }}
                    className={cx("auth-form__socials-icon")}
                  />
                  <span className={cx("auth-form__socials-tittle")}>
                    Kết nối với Facebook
                  </span>
                </div>
              </a>
              <a
                href="https://www.google.com/webhp?hl=vi&sa=X&ved=0ahUKEwj-tLPmg_P6AhUU9XMBHc0lBpEQPAgI"
                className={cx(
                  "auth-form__socials--link",
                  "auth-form__socials--gg"
                )}
              >
                <div className={cx("auth-form__socials--wrapper")}>
                  <GoogleIcon
                    sx={{ fontSize: 20, marginRight: "" }}
                    className={cx("auth-form__socials-icon")}
                  />
                  <span className={cx("auth-form__socials-tittle")}>
                    Kết nối với Google
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AuthForm.propTypes = {
  signIn: PropTypes.bool,
  signUp: PropTypes.bool,
  showSignInForm: PropTypes.func,
  showSignUpForm: PropTypes.func,
};

export default AuthForm;
