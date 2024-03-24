import { useState } from "react";
import styles from "./MyOrderList.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { useGetMyOrders } from "@/react-query/orderQuery";
import handleDecoded from "@/utils/jwtDecode";
import { useSelector } from "react-redux";
import currencyFormat from "@/utils/currencyFormat";
import getPriceDiscount from "@/utils/getPriceDiscount";
import { format } from "date-fns";
import { Button } from "@/components";
import { useDeleteOrder, useUpdateOrder } from "@/react-query/orderQuery";
import message from "@/utils/message.js";
import { RatingCakesForm } from "@/forms";

const cx = classNames.bind(styles);
const MyOrderList = () => {
  const { storageData } = handleDecoded();
  const currentUser = useSelector((state) => state.user);
  const { mutateAsync: deleteOrder } = useDeleteOrder();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const { data: myOrders, isLoading } = useGetMyOrders({
    token: storageData,
    idUser: currentUser._id,
  });

  const [itemsRating, setItemsRating] = useState([{}]);
  const [idOrder, setIdOrder] = useState("");
  const [isOpenRatingForm, setIsOpenRatingForm] = useState(false);

  const handleDeleteOrder = async (items, idOrder) => {
    const { storageData } = handleDecoded();
    const data = await deleteOrder({
      token: storageData,
      orderId: idOrder,
      orderItems: items,
    });

    if (data.status === "200") {
      message("success", "Xóa đơn hàng thành công");
    } else {
      message("error", data.message);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    await updateOrder({
      id: orderId,
      infoUpdate: {
        status: "evaluate_product",
      },
    });
  };

  const handleRating = (itemsRating, idOrder) => {
    setItemsRating(itemsRating);
    setIdOrder(idOrder);
    setIsOpenRatingForm(true);
  };

  const renderStatus = (status, itemsOrder, idOrder) => {
    switch (status) {
      case "waiting_confirm":
        return (
          <Button
            primary
            onClick={async () => await handleDeleteOrder(itemsOrder, idOrder)}
          >
            Hủy đơn hàng
          </Button>
        );
      case "confirm_order":
        return (
          <Button
            primary
            onClick={async () => await handleUpdateStatus(idOrder)}
          >
            Đã nhận được hàng
          </Button>
        );
      case "evaluate_product":
        const newItemsRating = itemsOrder.filter(
          (item) => item.isRating === false
        );
        if (newItemsRating.length > 0) {
          return (
            <Button primary onClick={() => handleRating(itemsOrder, idOrder)}>
              Đánh giá
            </Button>
          );
        }
        return <></>;
      default:
        return <></>;
    }
  };

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

                        <div>
                          {renderStatus(item.status, item.orderItems, item._id)}
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

      {isOpenRatingForm && (
        <RatingCakesForm
          itemsOrder={itemsRating}
          idOrder={idOrder}
          openForm={setIsOpenRatingForm}
        />
      )}
    </div>
  );
};

export default MyOrderList;
