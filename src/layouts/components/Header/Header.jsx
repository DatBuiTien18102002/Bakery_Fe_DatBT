import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "@/config";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

import { useEffect, useRef, useState } from "react";
import { Wrapper } from "@/components/Menu";
import HeadlessTippy from "@tippyjs/react/headless";
import { sectionMenu } from "@/constants";
import Search from "../Search/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import { Menu } from "@/components";
import { AuthForm } from "@/forms";
import { useDispatch, useSelector } from "react-redux";
import images from "@/assets/images";
import { useLogout } from "@/react-query/userQuery";
import { resetUser } from "@/redux/slice/userSlice";
import { Button } from "@/components";
import { CardItem } from "./components";

const cx = classNames.bind(styles);
const Header = () => {
  const inputMobile = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const currentUser = useSelector((state) => state.user);
  const { orderItems } = useSelector((state) => state.order);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { mutate: logoutUser } = useLogout();

  useEffect(() => {
    inputMobile.current.checked = false;
  });

  const handleScroll = () => {
    // Xử lý  khi trang được cuộn
    inputMobile.current.checked = false;
  };

  useEffect(() => {
    // Gắn hàm xử lý sự kiện cuộn khi component mount
    window.addEventListener("scroll", handleScroll);

    // Gỡ bỏ hàm xử lý sự kiện khi component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const MENU_ITEMS = [
    {
      tittle: "English",
      children: {
        tittle: "Language",
        data: [
          {
            code: "en",
            tittle: "Engligh",
          },
          {
            code: "vi",
            tittle: "Tiếng việt",
          },
        ],
      },
    },
    {
      tittle: "Feedback and Help",
      to: "/feedback",
    },
    {
      tittle: "Đăng nhập",
      separate: true,
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
      to: "/Admin",
    },
    currentUser.email && {
      tittle: "View profile",
      to: "/Profile",
    },
    {
      tittle: "Settings",
      to: "/settings",
    },
    {
      tittle: "English",
      children: {
        tittle: "Language",
        data: [
          {
            code: "en",
            tittle: "Engligh",
          },
          {
            code: "vi",
            tittle: "Tiếng việt",
          },
        ],
      },
    },
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
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    navigate("/");
  }

  return (
    <header className={cx("header")}>
      <div className={cx("container", "wrapper")}>
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

        <input
          ref={inputMobile}
          hidden
          type="checkbox"
          id="nav__mobile-input"
          className={cx("input-hidden-mobile")}
        />

        <label
          htmlFor="nav__mobile-input"
          className={cx("header_menu-mobile-btn")}
        >
          <MenuIcon className={cx("menu-icon")} />
        </label>

        <label
          htmlFor="nav__mobile-input"
          className={cx("nav__overplay")}
        ></label>

        <div className={cx("nav-wrapper")}>
          <div className={cx("logo")}>
            <Link to={config.routes.home}>
              <ul className={cx("logo-image")}>
                <li>B</li>
                <li>A</li>
                <li>R</li>
                <li>O</li>
                <li>I</li>
                <li>B</li>
                <li>E</li>
                <li>O</li>
              </ul>

              <div className={cx("logo-mobile")}>Baroibeo Bakery </div>
            </Link>
          </div>

          <nav className={cx("nav-list")}>
            {pathname === "/" ? (
              <>
                <HeadlessTippy
                  interactive
                  render={(attrs) => (
                    <div tabIndex="-1" {...attrs}>
                      <Wrapper>
                        {sectionMenu.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className={cx("nav-scroll")}
                          >
                            {item.title}
                          </a>
                        ))}
                      </Wrapper>
                    </div>
                  )}
                >
                  <Link
                    to={config.routes.home}
                    className={cx("nav-home", "nav-link")}
                  >
                    <div className={cx("nav-content")}>
                      Home
                      <ExpandMoreIcon className={cx("nav-home-icon")} />
                    </div>
                  </Link>
                </HeadlessTippy>

                <Link
                  to={config.routes.home}
                  className={cx("nav-home-mobile", "nav-link")}
                >
                  <div className={cx("nav-content")}>Home</div>
                </Link>
                <ul className={cx("nav-mobile-list")}>
                  {sectionMenu.map((item, index) => (
                    <li key={index} className={cx("nav-mobile-item")}>
                      <a href={item.href}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link to={config.routes.home} className={cx("nav-link")}>
                <div className={cx("nav-content")}>Home</div>
              </Link>
            )}
            <Link to={config.routes.aboutUs} className={cx("nav-link")}>
              <div className={cx("nav-content")}>AboutUs</div>
            </Link>
            <Link to={config.routes.product} className={cx("nav-link")}>
              <div className={cx("nav-content")}>Product</div>
            </Link>
            <Link to={config.routes.contact} className={cx("nav-link")}>
              <div className={cx("nav-content")}>Contact</div>
            </Link>
          </nav>
        </div>

        <Search />

        <div className={cx("action")}>
          <HeadlessTippy
            interactive
            placement="bottom-end"
            offset={[3, 17]}
            render={(attrs) => (
              <div className={cx("cart-result")} tabIndex="-1" {...attrs}>
                <Wrapper>
                  {orderItems.length > 0 ? (
                    <div className={cx("cart__has-cart")}>
                      <h4 className={cx("cart-tittle")}>Sản phẩm đã thêm</h4>
                      <ul className={cx("cart-list")}>
                        {orderItems.map((cake, index) => (
                          <CardItem key={index} cake={cake} />
                        ))}
                      </ul>
                      <Button
                        to={config.routes.cart}
                        primary
                        className={cx("cart-button")}
                      >
                        Xem giỏ hàng
                      </Button>
                    </div>
                  ) : (
                    <div className={cx("cart__no-cart")}>
                      <img src={images.noCart} alt="" />
                      <span>Chưa có sản phẩm</span>
                    </div>
                  )}
                </Wrapper>
              </div>
            )}
          >
            <button className={cx("shopping-btn")}>
              <ShoppingCartIcon sx={{ fontSize: 27 }} />
              {orderItems.length > 0 ? (
                <span className={cx("cart-quality")}>{orderItems.length}</span>
              ) : (
                <></>
              )}
            </button>
          </HeadlessTippy>

          <Menu arrow items={currentUser.email ? USER_MENU : MENU_ITEMS}>
            {currentUser.email ? (
              <div className={cx("user-avatar")}>
                <img
                  src={
                    currentUser.avatar
                      ? currentUser.avatar
                      : images.avatarDefault
                  }
                  alt="avatar user"
                  className={cx("user-img")}
                />
              </div>
            ) : (
              <div className={cx("user-icon")}>
                <PersonIcon sx={{ fontSize: 35 }} />
              </div>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  // isHomePage: PropTypes.bool,
};

export default Header;
