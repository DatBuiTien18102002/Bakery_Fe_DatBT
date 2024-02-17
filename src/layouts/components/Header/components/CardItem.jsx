import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import currencyFormat from "@/utils/currencyFormat";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const CardItem = (cake) => {
  //   const dispatch = useDispatch();

  //   const handleDeleteCart = (id) => {
  //     dispatch(deleteCart(id));
  //   };
  return (
    <li className={cx("cart-item")}>
      <img className={cx("cart-img")} src={cake?.image} alt="" />
      <div className={cx("cart-info")}>
        <div className={cx("cart-heading")}>
          <h5 className={cx("cart-name")}>{cake?.name}</h5>
          <div className={cx("cart-price-wrapper")}>
            <span className={cx("cart-price")}>
              {currencyFormat(cake?.price)}
            </span>
            <span className={cx("cart-multiply")}>x</span>
            <span className={cx("cart-qnt")}>{cake?.quantity}</span>
          </div>
        </div>

        <div className={cx("cart-body")}>
          <span className={cx("cart-type")}>Phân loại: {cake?.type}</span>
          <span
            className={cx("cart-delete")}
            // onClick={() => handleDeleteCart(cake?._id)}
          >
            Xóa
          </span>
        </div>
      </div>
    </li>
  );
};

CardItem.propTypes = {
  cake: PropTypes.object,
};

export default CardItem;
