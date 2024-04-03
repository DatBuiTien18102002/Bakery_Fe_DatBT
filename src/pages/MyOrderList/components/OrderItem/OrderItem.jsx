import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { format } from "date-fns";

import styles from "./OrderItem.module.scss";
import getPriceDiscount from "@/utils/getPriceDiscount";
import currencyFormat from "@/utils/currencyFormat";

const cx = classNames.bind(styles);

const OrderItem = ({ item, renderStatus }) => {
  const formattedDateOrder = format(
    new Date(item.createdAt),
    "HH:mm:ss dd-MM-yyyy "
  );

  return (
    <div className={cx("my-order__order-item")}>
      <div className={cx("my-order__order-heading")}>
        <div className={cx("my-order__order-title")}>Danh sách sản phẩm</div>
        <div className={cx("my-order__order-time")}>
          <span>Thời gian đặt hàng:</span> {formattedDateOrder}
        </div>
      </div>

      <div className={cx("my-order__product-list")}>
        {item?.orderItems.map((productItem, index) => {
          let totalPrice = productItem.price * productItem.amount;

          if (productItem.discount) {
            totalPrice =
              getPriceDiscount(productItem.price, productItem.discount) *
              productItem.amount;
          }

          return (
            <div key={index} className={cx("my-order__product-item")}>
              <div className={cx("my-order__product-avatar")}>
                <img src={productItem.image} alt="" />
              </div>
              <div className={cx("my-order__product-content")}>
                <div>
                  <div className={cx("my-order__product-title")}>
                    {productItem.name}
                  </div>
                  <div className={cx("my-order__product-type")}>
                    Phân loại hàng: {productItem.type}
                  </div>
                  <div className={cx("my-order__product-qnt")}>
                    x{productItem.amount}
                  </div>
                </div>

                <div className={cx("my-order__product-price-wrapper")}>
                  <div className={cx("my-order__product-price")}>
                    {currencyFormat(totalPrice)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={cx("my-order__order-info")}>
        <div>
          <div>
            <span className={cx("my-order__order-label")}>
              Phương thức giao hàng
            </span>{" "}
            <div className={cx("my-order__wrapper-info")}>
              {item.shippingMethod === "fast"
                ? "Giao hàng nhanh"
                : "Giao hàng tiết kiệm"}
            </div>
          </div>
          <div>
            <span className={cx("my-order__order-label")}>
              Phương thức thanh toán:
            </span>{" "}
            <div className={cx("my-order__wrapper-info")}>
              {item.paymentMethod === "later_money"
                ? "Thanh toán tiền mặt khi nhận hàng"
                : ""}
            </div>
          </div>
        </div>

        <div className={cx("my-order__order-total-price")}>
          <div>
            <span className={cx("my-order__order-label")}>Thành tiền:</span>{" "}
            <span className={cx("my-order__order-price")}>
              {currencyFormat(item.price)}
            </span>
          </div>

          <div>{renderStatus(item.status, item.orderItems, item._id)}</div>
        </div>
      </div>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
  renderStatus: PropTypes.func,
};

export default OrderItem;
