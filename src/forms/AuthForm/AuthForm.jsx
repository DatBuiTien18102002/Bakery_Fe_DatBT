import PropTypes from "prop-types";

import { useLoginUser, useCreateUser } from "@/react-query/userQuery";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import AuthFormView from "./components/AuthFormView/AuthFormView";
import message from "@/utils/message";
import { updateUser } from "@/redux/slice/userSlice";
import userApi from "@/services/userApi";
import { useEffect } from "react";

const AuthForm = (props) => {
  const dispatch = useDispatch();
  const { form, showSignInForm, showSignUpForm } = props;

  const { mutateAsync: loginUser, isPending: loadingSignIn } = useLoginUser();
  const { mutateAsync: createUser, isPending: loadingSignUp } = useCreateUser();

  useEffect(() => {
    setTimeout(() => {
      alert(
        "Tài khoản với quyền truy cập admin \nEmail: test@gmail.com \nPassword: 123456"
      );
    }, 1000);
  }, []);

  const handleSignIn = async (values) => {
    try {
      const res = await loginUser({
        email: values?.email,
        password: values?.password.trim(),
      });

      if (res?.status === "200") {
        message("success", res?.message);
        const decoded = jwtDecode(res?.access_token);
        if (decoded.payload?.id) {
          const userDetail = await userApi.getDetailUser(
            decoded.payload.id,
            res?.access_token
          );
          if (userDetail?.data) {
            dispatch(
              updateUser({
                access_token: res?.access_token,
                refresh_token: res?.refresh_token,
                ...userDetail.data,
              })
            );
            localStorage.setItem(
              "access_token",
              JSON.stringify(res?.access_token)
            );

            //Thêm refresh token vào local storage thay vì cookie
            localStorage.setItem(
              "refresh_token",
              JSON.stringify(res?.refresh_token)
            );
          }
          showSignInForm(false);
        }
      } else {
        message("error", res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (values) => {
    try {
      const res = await createUser({
        email: values.email,
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
      });

      if (res?.status === "200") {
        message("success", res?.message);
        await handleSignIn(values);
      } else {
        message("error", res?.message);
      }

      showSignUpForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitAuth = async (values) => {
    if (form === "signIn") {
      await handleSignIn(values);
    } else {
      await handleSignUp(values);
    }
  };

  return (
    <>
      <AuthFormView
        authProp={{
          form,
          showSignInForm,
          showSignUpForm,
          handleSubmitAuth,
          loadingSignIn,
          loadingSignUp,
        }}
      />
    </>
  );
};

AuthForm.propTypes = {
  form: PropTypes.string,
  showSignInForm: PropTypes.func,
  showSignUpForm: PropTypes.func,
};

export default AuthForm;
