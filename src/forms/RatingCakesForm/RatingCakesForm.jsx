import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RatingCakesForm.module.scss";
import classNames from "classnames/bind";

import CancelIcon from "@mui/icons-material/Cancel";
import Rating from "@mui/material/Rating";

import { Modal, Button } from "@/components";
import { useUpdateProduct } from "../../react-query/productQuery";
import { useUpdateOrder } from "../../react-query/orderQuery";
import message from "@/utils/message.js";

const cx = classNames.bind(styles);
const RatingCakesForm = ({ itemsOrder, openForm, idOrder }) => {
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: updateOrder, isPending: loadingUpdate } =
    useUpdateOrder();

  const [ratingOrders, setRatingOrders] = useState(
    itemsOrder.map((item) => ({ id: item._id, rate: 0 }))
  );

  const [itemsRating, setItemsRating] = useState(
    itemsOrder.filter((item) => item.isRating === false)
  );

  useEffect(() => {
    if (itemsRating.length === 0) {
      openForm(false);
    }
  }, [itemsRating]);

  const handleEvaluate = async (item) => {
    const newOrder = itemsOrder.map((itemOrder) => {
      if (itemOrder._id === item._id) {
        itemOrder = { ...itemOrder, isRating: true };
      }
      return itemOrder;
    });

    const cakeUpdate = itemsOrder.find(
      (itemOrder) => itemOrder._id === item._id
    );
    const ratingUpdate = ratingOrders.find(
      (itemOrder) => itemOrder.id === item._id
    );

    const newRating =
      (cakeUpdate.rating * cakeUpdate.amountRate + ratingUpdate.rate) /
      (cakeUpdate.amountRate + 1);

    const resUpdateProduct = await updateProduct({
      id: cakeUpdate._id,
      rating: newRating.toFixed(1),
      amountRate: cakeUpdate.amountRate + 1,
    });

    const resUpdateOrder = await updateOrder({
      id: idOrder,
      infoUpdate: {
        orderItems: newOrder,
      },
    });

    if (resUpdateOrder?.data?.orderItems) {
      const newItemsRating = resUpdateOrder.data.orderItems.filter(
        (item) => item.isRating === false
      );
      setItemsRating([...newItemsRating]);
    }

    if (
      resUpdateOrder?.status === "200" &&
      resUpdateProduct?.status === "200"
    ) {
      message("success", "Đánh giá sản phẩm thành công!");
    } else {
      message("error", "Đánh giá sản phẩm thất bại!");
    }
  };

  return (
    <Modal>
      <div className={cx("rating-cake__container")}>
        <div className={cx("wrapper__close-btn")}>
          <CancelIcon
            sx={{ fontSize: 30 }}
            className={cx("close-btn")}
            onClick={() => openForm(false)}
          />
        </div>
        <div className={cx("rating-cake__header")}>Đánh giá sản phẩm</div>

        <div className={cx("rating-cake__list")}>
          {itemsRating?.map((item, index) => {
            return (
              <div key={index} className={cx("rating-cake__item")}>
                <div className={cx("rating-cake__img")}>
                  <img src={item.image} alt="" />
                </div>
                <div className={cx("rating-cake__content")}>
                  <div className={cx("rating-cake__name")}>{item.name}</div>
                  <div className={cx("rating-cake__rate")}>
                    <Rating
                      name="simple-controlled"
                      defaultValue={0}
                      onChange={(_, newValue) => {
                        const newRating = ratingOrders.filter(
                          (itemRating) => itemRating.id !== item._id
                        );

                        setRatingOrders([
                          ...newRating,
                          { id: item._id, rate: newValue },
                        ]);
                      }}
                      size="small"
                    />
                  </div>
                </div>
                <div className={cx("rating-cake__btn-update")}>
                  <Button
                    primary
                    onClick={async () => await handleEvaluate(item)}
                    disable={loadingUpdate}
                  >
                    Đánh giá
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

RatingCakesForm.propTypes = {
  itemsOrder: PropTypes.array,
  idOrder: PropTypes.string,
  openForm: PropTypes.func,
};

export default RatingCakesForm;
