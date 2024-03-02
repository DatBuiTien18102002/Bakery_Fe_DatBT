import classNames from "classnames/bind";
import styles from "./TimeService.module.scss";

import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";

const cx = classNames.bind(styles);
const TimeService = () => {
  return (
    <section id="ServiceTime" className={cx("service")}>
      <div className="container">
        <div className={cx("service-content")}>
          <div className={cx("tittle", "service-tittle")}>
            <h2>Thời gian hoạt động</h2>
            <DiamondIcon className="diamond-icon" />
          </div>

          <div className={cx("service-info")}>
            Baroibeo bakery là tiệm bánh với hương vị bánh thơm ngon đặc trưng
            kết hợp với không gian tuyệt đẹp ,âm nhạc phong phú cùng với sự phục
            vụ nhiệt tình tạo nên phong cách sang đẹp, lịch sự, gần gũi. Phong
            cách riêng chỉ Baroibeo bakery mới có.
          </div>

          <div className={cx("service-wrapper")}>
            <div className={cx("service-time")}>
              <div className={cx("service-time-tittle")}>
                Thứ 2 - Thứ 6 <br /> hàng tuần
              </div>
              <p>7 am - 11 am</p>
              <p>1 pm - 10 pm</p>
            </div>
            <div className={cx("service-time")}>
              <div className={cx("service-time-tittle")}>
                Thứ 7 - Chủ nhật <br /> hàng tuần
              </div>
              <p>8 am - 11 am</p>
              <p>1 pm - 9 pm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeService;
