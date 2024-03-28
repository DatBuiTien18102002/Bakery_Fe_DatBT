import classNames from "classnames/bind";
import styles from "./ImgShop.module.scss";
import images from "@/assets/images";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import ImageCustom from "@/components/ImageCustom/ImageCustom";

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
            <ImageCustom
              src={images.imgShop.imgShop1}
              hash={"LEHBrL~qEQ.8xG?bRjozMwIUWCoe"}
              className={cx("image-pic")}
            />
          </div>
          <div className={cx("image-item")}>
            <ImageCustom
              src={images.imgShop.imgShop2}
              hash={"LJI=b~?dks%$Y4rrIoI=^+NHNF?a"}
              className={cx("image-pic")}
            />
          </div>
          <div className={cx("image-item")}>
            <ImageCustom
              src={images.imgShop.imgShop3}
              hash={"LTK1,l8_DiIo?wadITM{sCj=kWxb"}
              className={cx("image-pic")}
            />
          </div>
          <div className={cx("image-item")}>
            <ImageCustom
              src={images.imgShop.imgShop4}
              hash={"LCIN~pJH$xM_B?o|4p%1}#b1r;%2"}
              className={cx("image-pic")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgShop;
