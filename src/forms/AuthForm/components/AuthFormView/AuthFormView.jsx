import PropTypes from "prop-types";

import classNames from "classnames/bind";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

import styles from "../../AuthForm.module.scss";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Modal } from "@/components";

const cx = classNames.bind(styles);

const AuthFormView = ({ authProp }) => {
  const { form, showSignInForm, showSignUpForm } = authProp;

  const loginWithGoogle = async () => {
    // window.open("http://localhost:3005/auth/google/callback ", "_self");
    window.open(import.meta.env.VITE_REACT_GOOGLE_AUTH_URL, "_self");
  };

  const loginWithFaceBook = async () => {
    window.open(import.meta.env.VITE_REACT_FACEBOOK_AUTH_URL, "_self");
  };
  return (
    <Modal>
      <div>
        <div className={cx("auth-form__container")}>
          <div className={cx("auth-form__header")}>
            <div className={cx("auth-form__heading")}>
              {form === "signIn" ? "Đăng nhập" : "Đăng ký"}
            </div>
            <div
              className={cx("auth-form__switch-btn")}
              onClick={() => {
                if (form === "signIn") {
                  showSignInForm(false);
                  showSignUpForm(true);
                } else {
                  showSignInForm(true);
                  showSignUpForm(false);
                }
              }}
            >
              {form === "signIn" ? "Đăng ký" : "Đăng nhập"}
            </div>
          </div>

          {form === "signIn" ? (
            <SignInForm authProp={authProp} />
          ) : (
            <SignUpForm authProp={authProp} />
          )}
        </div>
        <div className={cx("auth-form__socials")}>
          <div
            // href="https://www.facebook.com/"
            className={cx("auth-form__socials--link", "auth-form__socials--fb")}
            onClick={loginWithFaceBook}
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
          </div>
          <div
            // href="https://www.google.com/webhp?hl=vi&sa=X&ved=0ahUKEwj-tLPmg_P6AhUU9XMBHc0lBpEQPAgI"
            className={cx("auth-form__socials--link", "auth-form__socials--gg")}
          >
            <div
              className={cx("auth-form__socials--wrapper")}
              onClick={loginWithGoogle}
            >
              <GoogleIcon
                sx={{ fontSize: 20, marginRight: "" }}
                className={cx("auth-form__socials-icon")}
              />
              <span className={cx("auth-form__socials-tittle")}>
                Kết nối với Google
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

AuthFormView.propTypes = {
  authProp: PropTypes.object,
};

export default AuthFormView;
