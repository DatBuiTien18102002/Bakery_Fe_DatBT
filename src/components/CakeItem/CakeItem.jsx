import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./CakeItem.module.scss";
import images from "@/assets/images";
import currencyFormat from "@/utils/currencyFormat";

const cx = classNames.bind(styles);
function CakeItem({ data }) {
  return (
    <Link to={`/product/${data._id}`} className={cx("wrapper")}>
      <img
        className={cx("avatar")}
        src={data?.image ? data.image : images.productImgDefault}
        alt={data?.name}
      />

      <div className={cx("info")}>
        <h4 className={cx("name")}>
          <span>{data?.name}</span>
        </h4>
        <span className={cx("price")}>{currencyFormat(data?.price)}</span>
      </div>
    </Link>
  );
}

CakeItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CakeItem;
