import PropTypes from "prop-types";

import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef } from "react";
("react-redux");
import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import Search from "../Search/Search";
import { HeaderLogo, HeaderNav, HeaderCart, HeaderUser } from "./components";

const cx = classNames.bind(styles);
const Header = ({ noCart = false }) => {
  const inputMobile = useRef();

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

  return (
    <header className={cx("header")}>
      <div className={cx("container", "wrapper")}>
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
          <HeaderLogo />

          <HeaderNav />
        </div>

        <Search />

        <div className={cx("action")}>
          {!noCart ? <HeaderCart /> : <></>}

          <HeaderUser />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  noCart: PropTypes.bool,
};

export default Header;
