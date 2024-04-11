import { useState } from "react";

import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./MyOrderList.module.scss";
import handleDecoded from "@/utils/jwtDecode";
import {
  useDeleteOrder,
  useUpdateOrder,
  useGetMyOrders,
} from "@/react-query/orderQuery";
import message from "@/utils/message.js";
import { RatingCakesForm } from "@/forms";
import { Skeleton, Breadcrumb, Button } from "@/components";
import { NoOrder, OrderItem } from "./components";

const cx = classNames.bind(styles);
const MyOrderList = () => {
  const { storageData } = handleDecoded();
  const currentUser = useSelector((state) => state.user);
  const { mutateAsync: deleteOrder } = useDeleteOrder();
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const { data: myOrders, isLoading: loadingOrder } = useGetMyOrders({
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
      userId: currentUser._id,
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
      userId: currentUser._id,
      infoUpdate: {
        status: "evaluate_product",
        paidAt: new Date(),
      },
    });
  };

  const handleRating = (itemsRating, idOrder) => {
    setItemsRating(itemsRating);
    setIdOrder(idOrder);
    setIsOpenRatingForm(true);
  };

  const renderStatus = (status, itemsOrder, idOrder) => {
    const newItemsRating = itemsOrder.filter((item) => item.isRating === false);

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
      <Breadcrumb bgColor="white" />
      <div className={cx("my-order__wrapper")}>
        <div className="container">
          <div className={cx("my-order__title")}>Đơn Mua</div>
          <div className={cx("my-order__body")}>
            {!loadingOrder ? (
              <>
                {myOrders?.data?.length === 0 ? (
                  <NoOrder />
                ) : (
                  <div className={cx("my-order__order-list")}>
                    {myOrders?.data?.map((item, index) => {
                      return (
                        <OrderItem
                          key={index}
                          item={item}
                          renderStatus={renderStatus}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <Skeleton height="408px" />
            )}
          </div>
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
