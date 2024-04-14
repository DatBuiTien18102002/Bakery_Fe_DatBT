import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./RatingCakesForm.module.scss";
import classNames from "classnames/bind";
import CancelIcon from "@mui/icons-material/Cancel";
import Rating from "@mui/material/Rating";
import { TextField } from "@mui/material";

import { Modal, Button } from "@/components";
import { useUpdateProduct } from "@/react-query/productQuery";
import { useUpdateOrder } from "@/react-query/orderQuery";
import message from "@/utils/message.js";
import { useSelector } from "react-redux";
import productApi from "@/services/productApi";

const cx = classNames.bind(styles);
const RatingCakesForm = ({ itemsOrder, openForm, idOrder }) => {
  const currentUser = useSelector((state) => state.user);

  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { mutateAsync: updateOrder, isPending: loadingUpdate } =
    useUpdateOrder();

  const [ratingOrders, setRatingOrders] = useState(
    itemsOrder.map((item) => ({ id: item._id, rate: 0 }))
  );
  const [commentOrders, setCommentOrders] = useState(
    itemsOrder.map((item) => ({ id: item._id, comment: "" }))
  );

  const [itemsOrderUpdate, setItemsOrderUpdate] = useState(itemsOrder);
  const [itemsRating, setItemsRating] = useState(
    itemsOrder.filter((item) => item.isRating === false)
  );

  useEffect(() => {
    if (itemsRating.length === 0) {
      openForm(false);
    }
  }, [itemsRating]);

  const getCommentById = (id) => {
    const commentOrder = commentOrders.find((item) => item.id === id);
    return commentOrder.comment;
  };

  const handleEvaluate = async (item) => {
    const newOrder = itemsOrderUpdate.map((itemOrder) => {
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
    const commentUpdate = commentOrders.find(
      (itemOrder) => itemOrder.id === item._id
    );
    const productRating = await productApi.getDetailProduct(item._id);

    let newComments;

    if (productRating.data?.comments) {
      newComments = [
        ...productRating.data.comments,
        {
          userId: currentUser._id,
          userAvatar: currentUser.avatar,
          userName: currentUser?.name || currentUser?.email,
          rating: ratingUpdate.rate,
          comment: commentUpdate.comment,
          dateComment: new Date(),
        },
      ];
    } else {
      newComments = [
        {
          userId: currentUser._id,
          userAvatar: currentUser.avatar,
          userName: currentUser?.name || currentUser?.email,
          rating: ratingUpdate.rate,
          comment: commentUpdate.comment,
          dateComment: new Date(),
        },
      ];
    }

    const newRating =
      (cakeUpdate.rating * cakeUpdate.amountRate + ratingUpdate.rate) /
      (cakeUpdate.amountRate + 1);

    const resUpdateProduct = await updateProduct({
      id: cakeUpdate._id,
      rating: newRating.toFixed(1),
      amountRate: cakeUpdate.amountRate + 1,
      comments: newComments,
    });

    const resUpdateOrder = await updateOrder({
      id: idOrder,
      userId: currentUser._id,
      infoUpdate: {
        orderItems: newOrder,
      },
    });

    if (resUpdateOrder?.data?.orderItems) {
      const newItemsRating = resUpdateOrder.data.orderItems.filter(
        (item) => item.isRating === false
      );
      setItemsOrderUpdate(resUpdateOrder?.data?.orderItems);
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
                  <div className={cx("rating-cake__wrapper")}>
                    <div>
                      <div className={cx("rating-cake__name")}>{item.name}</div>

                      <div className={cx("rating-cake__rate")}>
                        <Rating
                          name="simple-controlled"
                          value={
                            ratingOrders.find(
                              (itemRating) => itemRating.id === item._id
                            ).rate
                          }
                          onChange={(_, newValue) => {
                            const newRatings = ratingOrders.filter(
                              (itemRating) => itemRating.id !== item._id
                            );
                            setRatingOrders([
                              ...newRatings,
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

                  <div className={cx("rating-cake__comment")}>
                    <TextField
                      id="commentCake"
                      label="Bình luận về sản phẩm"
                      fullWidth
                      // color="primary"
                      multiline={true}
                      rows={2}
                      value={getCommentById(item._id)}
                      onChange={(e) => {
                        const newComments = commentOrders.filter(
                          (itemComment) => itemComment.id !== item._id
                        );
                        setCommentOrders([
                          ...newComments,
                          { id: item._id, comment: e.target.value },
                        ]);
                      }}
                    />
                  </div>
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
