import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDetailProduct } from "@/react-query/productQuery";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import { Rating } from "@mui/material";
import currencyFormat from "@/utils/currencyFormat.js";
import { Button } from "@/components";
import getPriceDiscount from "@/utils/getPriceDiscount";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "@/redux/slice/orderSlice";

const cx = classNames.bind(styles);
const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data: productDetail } = useGetDetailProduct(id);

  const [numProduct, setNumProduct] = useState(1);

  const handleInput = (e) => {
    if (productDetail?.data.countInStock < e.target.value) {
      setNumProduct(productDetail?.data.countInStock);
    } else {
      setNumProduct(e.target.value);
    }
  };
  const minusNumProduct = () => {
    if (numProduct === 1) {
      return;
    }
    setNumProduct((prevState) => prevState - 1);
  };
  const plusNumProduct = () => {
    if (numProduct === productDetail?.data.countInStock) {
      return;
    }
    setNumProduct((prevState) => prevState + 1);
  };
  const handleAddToCart = () => {
    dispatch(
      addOrderProduct({
        orderItem: { ...productDetail?.data, amount: numProduct },
      })
    );
  };

  return (
    <section className={cx("product-detail")}>
      <div className="container">
        <div className={cx("product-detail-row")}>
          <div className={cx("product-detail-col")}>
            <img
              className={cx("product-detail__img")}
              src={productDetail?.data.image}
              alt=""
            />

            {productDetail?.data.countInStock === 0 && (
              <div className={cx("product-sold-out")}>Hết Hàng</div>
            )}
          </div>
          <div className={cx("product-detail-col")}>
            <div className={cx("product-detail__tittle")}>
              {productDetail?.data.name}
            </div>

            <div className={cx("product-detail__rate")}>
              <Rating
                name="read-only"
                value={
                  productDetail?.data.rating ? productDetail?.data.rating : 0
                }
                readOnly
                precision={0.1}
              />
              <p className={cx("product-detail__rate-num")}>
                {productDetail?.data.amountRate} đánh giá
              </p>
            </div>

            <div className={cx("product-detail__desc")}>
              {productDetail?.data.description}
            </div>
            <div className={cx("product-detail__price")}>
              <span className={cx("product-detail__label")}>Giá bán: </span>
              <span className={cx("product-detail__price-num")}>
                {currencyFormat(
                  productDetail?.data.discount
                    ? getPriceDiscount(
                        productDetail?.data.price,
                        productDetail?.data.discount
                      )
                    : productDetail?.data.price
                )}
              </span>
            </div>

            <div className={cx("product-detail__num-wrapper")}>
              <div className={cx("product-detail__label")}>Số lượng: </div>
              <div className={cx("product-detail__quantity")}>
                <div
                  className={cx("product-detail__control", "control-minus", {
                    disabled: numProduct === 1,
                  })}
                  onClick={minusNumProduct}
                >
                  -
                </div>
                <input
                  className={cx("product-detail__num")}
                  type="number"
                  value={numProduct}
                  onChange={handleInput}
                />
                <div
                  className={cx("product-detail__control", "control-plus", {
                    disabled: numProduct === productDetail?.data.countInStock,
                  })}
                  onClick={plusNumProduct}
                >
                  +
                </div>
              </div>
              <div className={cx("product-detail__inStock")}>
                {productDetail?.data.countInStock} sản phẩm có sẵn
              </div>
            </div>

            <Button
              className={cx("product-detail__btn")}
              primary
              onClick={handleAddToCart}
              disable={productDetail?.data.countInStock === 0}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
