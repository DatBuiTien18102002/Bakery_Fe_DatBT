import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./HeaderMenu.module.scss";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const cx = classNames.bind(styles);

const HeaderMenu = ({ tittle, onBack }) => {
  return (
    <header className={cx("header-menu")}>
      <button className={cx("back-btn")} onClick={onBack}>
        <KeyboardArrowLeftIcon sx={{ fontSize: 27 }} />
      </button>
      <h4 className={cx("header-tittle")}>{tittle}</h4>
    </header>
  );
};

HeaderMenu.propTypes = {
  tittle: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default HeaderMenu;
