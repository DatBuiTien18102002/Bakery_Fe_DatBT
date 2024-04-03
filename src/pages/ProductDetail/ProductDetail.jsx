import { useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import message from "@/utils/message.js";
import styles from "./ProductDetail.module.scss";
import { useGetDetailProduct } from "@/react-query/productQuery";
import { addOrderProduct, selectedOrderItem } from "@/redux/slice/orderSlice";
import { ProductDetailView, ProductComment } from "./components";

const cx = classNames.bind(styles);
const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: productDetail, isLoading: loadingProduct } =
    useGetDetailProduct(id);

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
    message("success", "Thêm vào giỏ hàng thành công");
  };

  const handleOrder = () => {
    dispatch(
      addOrderProduct({
        orderItem: { ...productDetail?.data, amount: numProduct },
      })
    );
    dispatch(
      selectedOrderItem({
        orderItem: { ...productDetail?.data, amount: numProduct },
      })
    );
    navigate("/cart");
  };

  return (
    <section className={cx("product-detail")}>
      <div className="container">
        {!loadingProduct ? (
          <ProductDetailView
            item={productDetail?.data}
            numProduct={numProduct}
            handleInput={handleInput}
            plusNumProduct={plusNumProduct}
            minusNumProduct={minusNumProduct}
            handleAddToCart={handleAddToCart}
            handleOrder={handleOrder}
          />
        ) : (
          <ProductDetailView />
        )}

        <ProductComment item={productDetail?.data} isLoading={loadingProduct} />
      </div>
    </section>
  );
};

export default ProductDetail;
