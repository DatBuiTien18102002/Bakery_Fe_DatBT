import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./LoadingText.module.scss";

const cx = classNames.bind(styles);
const LoadingText = ({ fontSize, color }) => {
  return (
    <div className={cx("loading-text")} style={{ fontSize, color }}>
      <span>Loading</span>
      <ul className={cx("loading-dots")}>
        <li>.</li>
        <li>.</li>
        <li>.</li>
      </ul>
    </div>
  );
};

LoadingText.propTypes = {
  fontSize: PropTypes.string,
  color: PropTypes.string,
};

export default LoadingText;
