import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import config from "@/config";
import styles from "./HeaderLogo.module.scss";

const cx = classNames.bind(styles);
const HeaderLogo = () => {
  return (
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
  );
};

export default HeaderLogo;
