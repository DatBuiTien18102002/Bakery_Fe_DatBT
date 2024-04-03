import PropTypes from "prop-types";

import classNames from "classnames/bind";

import styles from "./Wrapper.module.scss";

const cx = classNames.bind(styles);

function Wrapper({
  children,
  className,
  arrow = false,
  arrowPosition = "right",
}) {
  const classes = cx("wrapper", {
    arrow,
    [className]: className,
    [arrowPosition]: arrowPosition,
  });
  return <div className={classes}>{children}</div>;
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  arrow: PropTypes.bool,
  arrowPosition: PropTypes.string,
};

export default Wrapper;
