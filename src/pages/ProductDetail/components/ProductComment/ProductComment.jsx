import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./ProductComment.module.scss";
import { ProductCommentItem, ProductNoComment } from "./components";
import { Pagination } from "@mui/material";
import { useState } from "react";

const cx = classNames.bind(styles);
const ProductComment = ({ item, isLoading }) => {
  const limit = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);

  const totalPage = Math.ceil(item?.comments.length / limit);

  const handleChangePaginate = (_, value) => {
    setCurrentPage(value);
  };

  const currentCommentList = () => {
    const begin = currentLimit * (currentPage - 1);
    const end = currentLimit * currentPage - 1;

    return item?.comments?.filter((_, index) => index >= begin && index <= end);
  };

  const handleMoreComment = () => {
    let newLimit = currentLimit + 2;
    if (newLimit > limit) {
      newLimit = limit;
    }
    setCurrentLimit(newLimit);
  };

  return (
    <div className={cx("product-detail__comment")}>
      <div className={cx("product-comment__title")}>ĐÁNH GIÁ SẢN PHẨM</div>

      {!isLoading ? (
        <>
          {item?.comments && item?.comments.length > 0 ? (
            <div className={cx("product-comment__wrapper")}>
              <div className={cx("product-comment__list")}>
                {currentCommentList().map((productComment, index) => (
                  <ProductCommentItem key={index} item={productComment} />
                ))}
              </div>
              {currentLimit === limit ||
              currentLimit >= item?.comments.length ? (
                <div className={cx("pagination")}>
                  <Pagination
                    count={totalPage}
                    color="primary"
                    page={currentPage}
                    size="large"
                    onChange={handleChangePaginate}
                  />
                </div>
              ) : (
                <div
                  className={cx("product-comment__more")}
                  onClick={handleMoreComment}
                >
                  Xem thêm
                </div>
              )}
            </div>
          ) : (
            <div className={cx("product-comment__no-comment")}>
              <ProductNoComment />
            </div>
          )}
        </>
      ) : (
        Array.from(Array(limit)).map((_, index) => (
          <ProductCommentItem key={index} />
        ))
      )}
    </div>
  );
};

ProductComment.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ProductComment;
