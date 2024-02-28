import classNames from "classnames/bind";
import styles from "./Introduce.module.scss";
import images from "@/assets/images";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";

const cx = classNames.bind(styles);
const Introduce = () => {
  return (
    <section className={cx("introduce")}>
      <div className="container">
        <div className={cx("introduce-wrapper")}>
          <div className={cx("introduce-bg")}>
            <div className={cx("bg-image")}>
              <div className={cx("bg-front")}>
                <img
                  src={images.introduceFont}
                  alt=""
                  className={cx("introduce-img")}
                />
              </div>
              <div className={cx("bg-back")}>
                <img
                  src={images.introduceBehind}
                  alt=""
                  className={cx("introduce-img")}
                />
              </div>
            </div>
          </div>
          <div className={cx("introduce-description")}>
            <p className={cx("introduce-name")}>Baroibeo bakery</p>
            <h2 className={cx("introduce-tittle")}>Giới thiệu</h2>

            <div className={cx("introduce-separate")}>
              <DiamondIcon />
              <div className={cx("introduce-line")} />
            </div>
            <p className={cx("introduce-info")}>
              Với tầm nhìn trở thành thương hiệu hàng đầu về chất lượng những
              sản phẩm bánh ngọt. Tiệm bánh Baroibeo luôn đề cao giá trị con
              người trong tổ chức và xem khách hàng là những người bạn để chia
              sẻ và truyền cảm hứng. Các sản phẩm của tiệm được làm từ các
              nguyên liệu nhập khẩu của các nước có truyền thống làm bánh như:
              Newzeland, Mỹ, Pháp, Bỉ. Với hương vị thơm ngon đặc trưng của các
              loại kem, bơ, sữa, phô mai, hạt hạnh nhân, chocolate... dưới bàn
              tay khéo léo của những người thợ làm bánh giàu kinh nghiệm của
              Baroibeo đã biến mỗi chiếc bánh thực sự là một tác phẩm nghệ thuật
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduce;
