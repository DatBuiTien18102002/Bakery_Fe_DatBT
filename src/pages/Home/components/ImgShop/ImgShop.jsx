import classNames from "classnames/bind";

import styles from "./ImgShop.module.scss";
import images from "@/assets/images";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import ImageCustom from "@/components/ImageCustom/ImageCustom";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const cx = classNames.bind(styles);
const ImgShop = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: `-200px` });
  const [addAnimate, setAddAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAddAnimate(true);
    }
  }, [isInView]);
  return (
    <section id="ImageShop" className={cx("image-shop")} ref={ref}>
      <div className="container">
        <div className={cx("tittle", "image-shop-tittle")}>
          {addAnimate && (
            <h2
              className={cx(
                "animate__animated animate__bounceIn animate__delay-0.5s"
              )}
            >
              Hình ảnh Baroibeo quán
            </h2>
          )}
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
