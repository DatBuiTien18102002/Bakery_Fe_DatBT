import React from "react";
import styles from "./MyOrderList.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { useGetMyOrders } from "@/react-query/orderQuery";
import handleDecoded from "@/utils/jwtDecode";
import { useSelector } from "react-redux";
import currencyFormat from "@/utils/currencyFormat";
import getPriceDiscount from "@/utils/getPriceDiscount";
import { format } from "date-fns";

const cx = classNames.bind(styles);
const MyOrderList = () => {
  const { storageData } = handleDecoded();
  const currentUser = useSelector((state) => state.user);

  const { data: myOrders, isLoading } = useGetMyOrders({
    token: storageData,
    idUser: currentUser._id,
  });

  return (
    <div className={cx("my-order")}>
      <div className="container">
        <div className={cx("my-order__title")}>Đơn Mua</div>
        <div className={cx("my-order__body")}>
          {myOrders?.data?.length === 0 ? (
            <div className={cx("no-order")}>
              <div className={cx("no-order__img")}>
                <img src={images.noOrder} alt="" />
              </div>
              <div className={cx("no-order__title")}>
                Bạn chưa có đơn hàng nào
              </div>

              <div className={cx("no-order__desc")}>
                Bắt đầu đặt đơn hàng đầu tiên của mình và theo dõi tại đây!
              </div>
            </div>
          ) : (
            <div className={cx("my-order__order-list")}>
              {myOrders?.data?.map((item, index) => {
                const formattedDateOrder = format(
                  new Date(item.createdAt),
                  "HH:mm:ss dd-MM-yyyy "
                );

                return (
                  <div key={index} className={cx("my-order__order-item")}>
                    <div className={cx("my-order__order-heading")}>
                      <div className={cx("my-order__order-title")}>
                        Danh sách sản phẩm
                      </div>
                      <div className={cx("my-order__order-time")}>
                        <span>Thời gian đặt hàng:</span> {formattedDateOrder}
                      </div>
                    </div>

                    <div className={cx("my-order__product-list")}>
                      {item?.orderItems.map((productItem, index) => {
                        let totalPrice = productItem.price * productItem.amount;

                        if (productItem.discount) {
                          totalPrice =
                            getPriceDiscount(
                              productItem.price,
                              productItem.discount
                            ) * productItem.amount;
                        }

                        return (
                          <div
                            key={index}
                            className={cx("my-order__product-item")}
                          >
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

                              <div
                                className={cx(
                                  "my-order__product-price-wrapper"
                                )}
                              >
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
                          <span className={cx("my-order__order-label")}>
                            Thành tiền:
                          </span>{" "}
                          <span className={cx("my-order__order-price")}>
                            {currencyFormat(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrderList;
