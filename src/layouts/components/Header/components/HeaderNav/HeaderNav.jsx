import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classNames from "classnames/bind";
import config from "@/config";
import HeadlessTippy from "@tippyjs/react/headless";
import { Link, useLocation } from "react-router-dom";

import styles from "./HeaderNav.module.scss";
import { Wrapper } from "@/components/Menu";
import { sectionMenu } from "@/constants";

const cx = classNames.bind(styles);
const HeaderNav = () => {
  const { pathname } = useLocation();

  return (
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
  );
};

export default HeaderNav;
