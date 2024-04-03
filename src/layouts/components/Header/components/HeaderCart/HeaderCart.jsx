import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";
import { useSelector } from "react-redux";

import styles from "./HeaderCart.module.scss";
import { Wrapper } from "@/components/Menu";
import CardItem from "../CardItem/CardItem.jsx";
import { Button } from "@/components";
import config from "@/config";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const HeaderCart = () => {
  const { orderItems } = useSelector((state) => state.order);

  return (
    <HeadlessTippy
      interactive
      placement="bottom-end"
      offset={[3, 17]}
      render={(attrs) => (
        <div className={cx("cart-result")} tabIndex="-1" {...attrs}>
          <Wrapper>
            {orderItems.length > 0 ? (
              <div className={cx("cart__has-cart")}>
                <h4 className={cx("cart-tittle")}>Sản phẩm đã thêm</h4>
                <ul className={cx("cart-list")}>
                  {orderItems.map((cake, index) => (
                    <CardItem key={index} cake={cake} />
                  ))}
                </ul>
                <Button
                  to={config.routes.cart}
                  primary
                  className={cx("cart-button")}
                >
                  Xem giỏ hàng
                </Button>
              </div>
            ) : (
              <div className={cx("cart__no-cart")}>
                <img src={images.noCart} alt="" />
                <span>Chưa có sản phẩm</span>
              </div>
            )}
          </Wrapper>
        </div>
      )}
    >
      <button className={cx("shopping-btn")}>
        <ShoppingCartIcon sx={{ fontSize: 27 }} />
        {orderItems.length > 0 ? (
          <span className={cx("cart-quality")}>{orderItems.length}</span>
        ) : (
          <></>
        )}
      </button>
    </HeadlessTippy>
  );
};

export default HeaderCart;
