import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);
const Modal = ({ children }) => {
  return (
    <div className={cx("modal")}>
      <div className={cx("modal__overlay")}>
        <div className={cx("modal__body")}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
