import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import currencyFormat from "@/utils/currencyFormat";
import { useDispatch } from "react-redux";
import { removeOrderProduct } from "@/redux/slice/orderSlice";
import getPriceDiscount from "@/utils/getPriceDiscount";

const cx = classNames.bind(styles);

const CardItem = ({ cake }) => {
  const dispatch = useDispatch();

  const handleDeleteCart = (id) => {
    dispatch(removeOrderProduct({ idProduct: id }));
  };
  let priceProduct = cake?.price;
  if (cake?.discount) {
    priceProduct = getPriceDiscount(cake?.price, cake?.discount);
  }

  return (
    <li className={cx("cart-item")}>
      <img className={cx("cart-img")} src={cake?.image} alt="" />
      <div className={cx("cart-info")}>
        <div className={cx("cart-heading")}>
          <h5 className={cx("cart-name")}>{cake?.name}</h5>
          <div className={cx("cart-price-wrapper")}>
            <span className={cx("cart-price")}>
              {currencyFormat(priceProduct)}
            </span>
            <span className={cx("cart-multiply")}>x</span>
            <span className={cx("cart-qnt")}>{cake?.amount}</span>
          </div>
        </div>

        <div className={cx("cart-body")}>
          <span className={cx("cart-type")}>Phân loại: {cake?.type}</span>
          <span
            className={cx("cart-delete")}
            onClick={() => handleDeleteCart(cake?._id)}
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
