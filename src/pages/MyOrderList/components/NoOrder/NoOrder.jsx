import classNames from "classnames/bind";

import styles from "./NoOrder.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const NoOrder = () => {
  return (
    <div className={cx("no-order")}>
      <div className={cx("no-order__img")}>
        <img src={images.noOrder} alt="" />
      </div>
      <div className={cx("no-order__title")}>Bạn chưa có đơn hàng nào</div>

      <div className={cx("no-order__desc")}>
        Bắt đầu đặt đơn hàng đầu tiên của mình và theo dõi tại đây!
      </div>
    </div>
  );
};

export default NoOrder;
