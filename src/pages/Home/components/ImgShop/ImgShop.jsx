import classNames from "classnames/bind";
import styles from "./ImgShop.module.scss";
import images from "@/assets/images";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";

const cx = classNames.bind(styles);
const ImgShop = () => {
  return (
    <section id="ImageShop" className={cx("image-shop")}>
      <div className="container">
        <div className={cx("tittle", "image-shop-tittle")}>
          <h2>Hình ảnh Baroibeo quán</h2>
          <DiamondIcon className={"diamond-icon"} />
        </div>

        <div className={cx("image-list")}>
          <div className={cx("image-item")}>
            <img src={images.imgShop.imgShop1} alt="" />
          </div>
          <div className={cx("image-item")}>
            <img src={images.imgShop.imgShop2} alt="" />
          </div>
          <div className={cx("image-item")}>
            <img src={images.imgShop.imgShop3} alt="" />
          </div>
          <div className={cx("image-item")}>
            <img src={images.imgShop.imgShop4} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgShop;
