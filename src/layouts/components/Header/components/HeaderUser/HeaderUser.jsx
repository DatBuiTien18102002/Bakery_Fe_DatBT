import { useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./HeaderUser.module.scss";
import { useLogout, useSocialLogOut } from "@/react-query/userQuery";
import images from "@/assets/images";
import { Menu } from "@/components";
import { AuthForm } from "@/forms";
import { resetUser } from "@/redux/slice/userSlice";

const cx = classNames.bind(styles);

const HeaderUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { mutate: logoutUser } = useLogout();
  const { mutate: logoutSocialMedia } = useSocialLogOut();

  const MENU_ITEMS = [
    // {
    //   tittle: "English",
    //   children: {
    //     tittle: "Language",
    //     data: [
    //       {
    //         code: "en",
    //         tittle: "Engligh",
    //       },
    //       {
    //         code: "vi",
    //         tittle: "Tiếng việt",
    //       },
    //     ],
    //   },
    // },
    // {
    //   tittle: "Feedback and Help",
    //   to: "/feedback",
    // },
    {
      tittle: "Đăng nhập",
      // separate: true,
      // eslint-disable-next-line no-undef
      onClick: showSignInForm,
      noIcon: true,
    },
    {
      tittle: "Đăng ký",
      // eslint-disable-next-line no-undef
      onClick: showSignUpForm,
      noIcon: true,
    },
  ];

  //Lọc item null hoặc undefined
  const USER_MENU = [
    currentUser.isAdmin && {
      tittle: "Manage System",
      to: "/admin",
    },
    currentUser._id && {
      tittle: "View profile",
      to: "/profile",
    },
    currentUser._id && {
      tittle: "My orders",
      to: "/my-orders",
    },
    // {
    //   tittle: "Settings",
    //   to: "/settings",
    // },
    // {
    //   tittle: "English",
    //   children: {
    //     tittle: "Language",
    //     data: [
    //       {
    //         code: "en",
    //         tittle: "Engligh",
    //       },
    //       {
    //         code: "vi",
    //         tittle: "Tiếng việt",
    //       },
    //     ],
    //   },
    // },
    {
      tittle: "Log out",
      onClick: handleLogOut,
      separate: true,
    },
  ].filter((item) => item);

  function showSignInForm(value = true) {
    setShowSignIn(value);
  }

  function showSignUpForm(value = true) {
    setShowSignUp(value);
  }

  function handleLogOut() {
    logoutUser();
    if (currentUser?.provider) {
      logoutSocialMedia();
    }
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  }

  return (
    <>
      {showSignIn ? (
        <AuthForm
          form="signIn"
          showSignInForm={showSignInForm}
          showSignUpForm={showSignUpForm}
        />
      ) : (
        <></>
      )}
      {showSignUp ? (
        <AuthForm
          form="signUp"
          showSignInForm={showSignInForm}
          showSignUpForm={showSignUpForm}
        />
      ) : (
        <></>
      )}

      <Menu items={currentUser._id ? USER_MENU : MENU_ITEMS}>
        {currentUser._id ? (
          <div className={cx("user-avatar")}>
            <img
              onError={(event) => {
                event.target.src = images.avatarDefault;
              }}
              src={
                currentUser.avatar ? currentUser.avatar : images.avatarDefault
              }
              className={cx("user-img")}
            />
          </div>
        ) : (
          <div className={cx("user-icon")}>
            <PersonIcon sx={{ fontSize: 35 }} />
          </div>
        )}
      </Menu>
    </>
  );
};

export default HeaderUser;
