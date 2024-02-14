import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { Link } from "react-router-dom";
import config from "@/config";
import { Menu } from "@/components";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";

import { useRef, useState } from "react";
import { Wrapper } from "@/components/Menu";
import HeadlessTippy from "@tippyjs/react/headless";
import { sectionMenu } from "@/constants";

const cx = classNames.bind(styles);
const Header = ({ isHomePage = false }) => {
  const inputMobile = useRef();

  return (
    <header className={cx("wrapper")}>
      <div className={cx("container")}>
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
            {isHomePage ? (
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

        <div>Search</div>

        <div>Action</div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isHomePage: PropTypes.bool,
};

export default Header;
