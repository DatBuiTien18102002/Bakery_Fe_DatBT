import classNames from "classnames/bind";

import styles from "./ProductNoComment.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const ProductNoComment = () => {
  return (
    <div className={cx("no-comment__wrapper")}>
      <div className={cx("no-comment__img")}>
        <img src={images.noComment} alt="" />
      </div>
      <div className={cx("no-comment__title")}>Chưa có đánh giá</div>
    </div>
  );
};

export default ProductNoComment;
