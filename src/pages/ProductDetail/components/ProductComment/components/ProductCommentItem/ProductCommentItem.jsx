import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Rating } from "@mui/material";
import { format } from "date-fns";
import { Skeleton } from "@/components";

import styles from "./ProductCommentItem.module.scss";

const cx = classNames.bind(styles);

const ProductCommentItem = ({ item }) => {
  let formattedDateOrder;
  if (item) {
    formattedDateOrder = format(
      new Date(item?.dateComment),
      "HH:mm:ss dd-MM-yyyy "
    );
  }
  return (
    <div className={cx("product-comment__wrapper")}>
      <div className={cx("product-comment__avatar")}>
        {item ? (
          <img src={item.userAvatar} alt="" />
        ) : (
          <Skeleton width="40px" height="40px" variant="circular" />
        )}
      </div>
      <div className={cx("product-comment__info")}>
        <div className={cx("product-comment__title")}>
          {item ? item.userName : <Skeleton width="130px" height="27px" />}
        </div>
        <div className={cx("product-comment__rating")}>
          <Rating
            name="read-only"
            value={item ? item.rating : 0}
            readOnly
            precision={0.1}
            size="small"
          />
        </div>
        <div className={cx("product-comment__date")}>
          {item ? formattedDateOrder : <Skeleton width="130px" height="18px" />}
        </div>
        <div className={cx("product-comment__desc")}>
          {item ? item.comment : <Skeleton width="600px" height="48px" />}
        </div>
      </div>
    </div>
  );
};

ProductCommentItem.propTypes = {
  item: PropTypes.object,
};

export default ProductCommentItem;
