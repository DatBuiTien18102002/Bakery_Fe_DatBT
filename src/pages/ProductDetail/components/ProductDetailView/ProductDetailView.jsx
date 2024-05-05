import PropTypes from "prop-types";

import { Rating } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./ProductDetailView.module.scss";
import currencyFormat from "@/utils/currencyFormat.js";
import getPriceDiscount from "@/utils/getPriceDiscount";
import { Skeleton } from "@/components";
import { Button } from "@/components";

const cx = classNames.bind(styles);
const ProductDetailView = ({
  item,
  numProduct,
  handleInput,
  plusNumProduct,
  minusNumProduct,
  handleAddToCart,
  handleOrder,
}) => {
  return (
    <div className={cx("product-detail-row")}>
      <div className={cx("product-detail-col")}>
        {item ? (
          <img className={cx("product-detail__img")} src={item?.image} alt="" />
        ) : (
          <Skeleton className={cx("product-detail__img")} />
        )}

        {item?.countInStock === 0 && (
          <div className={cx("product-sold-out")}>Hết Hàng</div>
        )}
      </div>
      <div className={cx("product-detail-col")}>
        <div className={cx("product-detail__tittle")}>
          {item ? item?.name : <Skeleton width="260px" height="42px" />}
        </div>

        <div className={cx("product-detail__rate")}>
          <Rating
            name="read-only"
            value={item?.rating ? item.rating : 0}
            readOnly
            precision={0.1}
          />
          <p className={cx("product-detail__rate-num")}>
            {item ? (
              `${item?.amountRate} đánh giá`
            ) : (
              <Skeleton width="73px" height="20px" />
            )}
          </p>
        </div>

        <div className={cx("product-detail__desc")}>
          {item ? item?.description : <Skeleton height="70px" />}
        </div>
        <div className={cx("product-detail__price")}>
          <span className={cx("product-detail__label")}>Giá bán: </span>
          <span className={cx("product-detail__price-num")}>
            {item ? (
              currencyFormat(
                item?.discount
                  ? getPriceDiscount(item?.price, item?.discount)
                  : item?.price
              )
            ) : (
              <Skeleton width="72px" height="22px" />
            )}
          </span>
        </div>

        <div className={cx("product-detail_num-wrapper")}>
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <div className={cx("product-detail__label")}>Số lượng: </div>
            <div className={cx("product-detail__quantity")}>
              <div
                className={cx("product-detail__control", "control-minus", {
                  disabled: numProduct === 1 || !item,
                })}
                onClick={minusNumProduct}
              >
                -
              </div>
              <input
                className={cx("product-detail__num")}
                type="number"
                value={item ? numProduct : 1}
                onChange={item ? handleInput : () => {}}
              />
              <div
                className={cx("product-detail__control", "control-plus", {
                  disabled: numProduct === item?.countInStock || !item,
                })}
                onClick={plusNumProduct}
              >
                +
              </div>
            </div>
          </div>
          <div className={cx("product-detail__inStock")}>
            {item ? `${item?.countInStock} sản phẩm có sẵn` : <></>}
          </div>
        </div>
        <div className={cx("product-detail__action")}>
          <Button
            className={cx("product-detail__btn")}
            outline
            onClick={handleAddToCart}
            disable={item?.countInStock === 0 || !item}
          >
            Thêm vào giỏ hàng
          </Button>

          <Button
            className={cx("product-detail__btn")}
            primary
            onClick={handleOrder}
            disable={item?.countInStock === 0 || !item}
          >
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductDetailView.propTypes = {
  item: PropTypes.object,
  numProduct: PropTypes.number,
  handleInput: PropTypes.func,
  minusNumProduct: PropTypes.func,
  plusNumProduct: PropTypes.func,
  handleAddToCart: PropTypes.func,
  handleOrder: PropTypes.func,
};

export default ProductDetailView;
