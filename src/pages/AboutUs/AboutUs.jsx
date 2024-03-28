import classNames from "classnames/bind";
import styles from "./AboutUs.module.scss";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import images from "@/assets/images";
import React, { useEffect, useRef } from "react";

import { ImageCustom } from "@/components";

const cx = classNames.bind(styles);
const AboutUs = () => {
  const aboutNumRefs = useRef([]);
  const aboutCountRef = useRef();

  aboutNumRefs.current = Array.from(Array(3)).map(
    (_, index) => aboutNumRefs.current[index] || React.createRef()
  );

  function nCount() {
    aboutNumRefs.current.map((element) => {
      let start = 0;
      let end = parseInt(element.current?.textContent);
      let duration = 1000;
      let startTime;

      function animateNumber(timeStamp) {
        if (!startTime) startTime = timeStamp;
        let progress = timeStamp - startTime;

        let percentage = Math.min(progress / duration, 1);

        let currentCount = Math.ceil(percentage * (end - start));

        if (element.current) {
          element.current.textContent = currentCount;
        }

        if (progress < duration) {
          requestAnimationFrame(animateNumber);
        }
      }

      requestAnimationFrame(animateNumber);
    });
  }

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target === aboutCountRef.current) {
        nCount();
        observer.disconnect();
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);

  useEffect(() => {
    observer.observe(aboutCountRef.current);
  }, []);

  return (
    <section className={cx("about")}>
      <div className="container">
        <div className={cx("about-bakery")}>Baroibeo Bakery</div>
        <div className={cx("tittle", "about-page-tittle")}>
          <h2>Về chúng tôi</h2>
          <DiamondIcon className={cx("diamond-icon")} />
        </div>

        <div className={cx("about-desc-row")}>
          <div className={cx("about-desc-col")}>
            <div className={cx("about__img-wrapper")}>
              <ImageCustom
                src={images.aboutPage}
                hash={"LkKmb5=w9uEg_NJ8NJs-%fSgxafi"}
                height="450px"
                className={cx("about-img")}
              />
            </div>
          </div>
          <div className={cx("about-desc-col")}>
            <div className={cx("about-wrapper")}>
              <div className={cx("about-tittle")}>
                Một chút về Baroibeo Bakery
              </div>
              <div className={cx("about-text")}>
                Baroibeo Bakery khởi đầu là một cơ sở nhỏ với quy mô gia đình
                vào đầu những năm 2018. Trải qua gần 5 năm xây dựng và phát
                triển, Baroibeo Bakery đã xây dựng được hai cửa hành bánh ngọt
                lớn và nổi tiếng thành phố Hồ Chí Minh. Là thương hiệu được biết
                đến với những sản phẩm chất lượng và ngon miệng. Cùng với tinh
                thần ham học hỏi, trách nhiệm, Baroibeo Bakery đã đang và sẽ
                luôn mang đến cho khách hàng những chiếc bánh nghệ thuật đẹp
                mắt, những chiếc bánh thơm ngon, dinh dưỡng và hợp vệ sinh với
                giá cả phải chăng.
              </div>
            </div>
          </div>
        </div>

        <div ref={aboutCountRef} className={cx("about-count-row")}>
          <div className={cx("about-count-col")}>
            <div className={cx("about-count")}>
              <div className={cx("about-count-num")}>
                <span ref={aboutNumRefs.current[0]}>50</span>+
              </div>
              <div className={cx("about-count-text")}>Nhân viên tiệm bánh</div>
            </div>
          </div>

          <div className={cx("about-count-col")}>
            <div className={cx("about-count")}>
              <div className={cx("about-count-num")}>
                <span ref={aboutNumRefs.current[1]}>3200</span>+
              </div>
              <div className={cx("about-count-text")}>
                Khách hàng thân thiết
              </div>
            </div>
          </div>

          <div className={cx("about-count-col")}>
            <div className={cx("about-count")}>
              <div className={cx("about-count-num")}>
                <span ref={aboutNumRefs.current[2]}>70</span>+
              </div>
              <div className={cx("about-count-text")}>Bánh ngọt các loại</div>
            </div>
          </div>
        </div>

        <div className={cx("about-adv-row")}>
          <div className={cx("about-adv-col")}>
            <div className={cx("about-adv")}>
              <img
                className={cx("about-icon")}
                src={images.aboutIcon.aboutIcon1}
                alt=""
              />
              <div className={cx("about-adv-tittle")}>Giao Hàng Nhanh</div>
              <div className={cx("about-adv-text")}>
                Tận hưởng niềm vui đón nhận bánh tươi ngon ngay tại cửa nhà bạn.
                Chúng tôi cam kết giao hàng nhanh chóng và đúng hẹn, để bạn có
                thêm thời gian thảnh thơi thưởng thức món ngọt.
              </div>
            </div>
          </div>

          <div className={cx("about-adv-col")}>
            <div className={cx("about-adv")}>
              <img
                className={cx("about-icon")}
                src={images.aboutIcon.aboutIcon2}
                alt=""
              />
              <div className={cx("about-adv-tittle")}>Chất Lượng Cao</div>
              <div className={cx("about-adv-text")}>
                Mỗi chiếc bánh là sản phẩm của tình yêu và tâm huyết, được chế
                biến từ những nguyên liệu tốt nhất và quy trình nghiêm ngặt để
                đảm bảo hương vị hoàn hảo.
              </div>
            </div>
          </div>

          <div className={cx("about-adv-col")}>
            <div className={cx("about-adv")}>
              <img
                className={cx("about-icon")}
                src={images.aboutIcon.aboutIcon3}
                alt=""
              />
              <div className={cx("about-adv-tittle")}>Ưu Đãi Tốt Nhất</div>
              <div className={cx("about-adv-text")}>
                Bạn xứng đáng nhận được điều tốt nhất, và chúng tôi hiểu điều
                đó. Chúng tôi mang đến những ưu đãi đặc biệt, giảm giá hấp dẫn
                và quà tặng thú vị để bạn cảm nhận sự trân trọng của chúng tôi
                đối với sự ủng hộ của bạn.
              </div>
            </div>
          </div>

          <div className={cx("about-adv-col")}>
            <div className={cx("about-adv")}>
              <img
                className={cx("about-icon")}
                src={images.aboutIcon.aboutIcon4}
                alt=""
              />
              <div className={cx("about-adv-tittle")}>Thanh Toán An Toàn</div>
              <div className={cx("about-adv-text")}>
                Sự an toàn của thông tin cá nhân và giao dịch thanh toán là ưu
                tiên hàng đầu. Với hệ thống thanh toán được bảo mật hàng đầu,
                bạn có thể yên tâm thực hiện giao dịch một cách an toàn và tiện
                lợi.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
