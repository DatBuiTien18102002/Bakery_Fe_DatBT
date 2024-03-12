import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "../../AuthForm.module.scss";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";

import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";
import { Modal } from "@/components";

const cx = classNames.bind(styles);

const AuthFormView = ({ authProp }) => {
  const { form, showSignInForm, showSignUpForm } = authProp;
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
          <a
            href="https://www.facebook.com/"
            className={cx("auth-form__socials--link", "auth-form__socials--fb")}
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
            className={cx("auth-form__socials--link", "auth-form__socials--gg")}
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
    </Modal>
  );
};

AuthFormView.propTypes = {
  authProp: PropTypes.object,
};

export default AuthFormView;
