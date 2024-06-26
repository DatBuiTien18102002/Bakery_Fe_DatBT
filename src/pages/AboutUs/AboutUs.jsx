import React, { useEffect, useRef } from "react";

import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import { motion, useInView } from "framer-motion";
import { fadeIn, fadeInLeft } from "@/utils/animation";

import images from "@/assets/images";
import styles from "./AboutUs.module.scss";
import classNames from "classnames/bind";
import { ImageCustom } from "@/components";
import { statsAboutUs, advAboutUs } from "@/constants";

const cx = classNames.bind(styles);
const AboutUs = () => {
  const aboutNumRefs = useRef([]);
  const aboutCountRef = useRef();

  const advRef = useRef();
  const isInView = useInView(advRef, { margin: "-200px" });

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
        <motion.div
          className={cx("about-bakery")}
          variants={fadeIn(1, 1)}
          initial="hidden"
          animate="show"
        >
          Baroibeo Bakery
        </motion.div>
        <div className={cx("tittle", "about-page-tittle")}>
          <h2 className={cx("animate__animated animate__backInDown ")}>
            Về chúng tôi
          </h2>
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
              <div
                className={cx(
                  "about-tittle",
                  "animate__animated animate__bounceInRight animate__delay-1s"
                )}
              >
                Một chút về Baroibeo Bakery
              </div>
              <motion.div
                className={cx("about-text")}
                variants={fadeIn(1, 2)}
                initial="hidden"
                animate="show"
              >
                Baroibeo Bakery khởi đầu là một cơ sở nhỏ với quy mô gia đình
                vào đầu những năm 2018. Trải qua gần 5 năm xây dựng và phát
                triển, Baroibeo Bakery đã xây dựng được hai cửa hành bánh ngọt
                lớn và nổi tiếng thành phố Hồ Chí Minh. Là thương hiệu được biết
                đến với những sản phẩm chất lượng và ngon miệng. Cùng với tinh
                thần ham học hỏi, trách nhiệm, Baroibeo Bakery đã đang và sẽ
                luôn mang đến cho khách hàng những chiếc bánh nghệ thuật đẹp
                mắt, những chiếc bánh thơm ngon, dinh dưỡng và hợp vệ sinh với
                giá cả phải chăng.
              </motion.div>
            </div>
          </div>
        </div>

        <div ref={aboutCountRef} className={cx("about-count-row")}>
          {statsAboutUs.map((statItem, index) => (
            <div key={statItem.label} className={cx("about-count-col")}>
              <div className={cx("about-count")}>
                <div className={cx("about-count-num")}>
                  <span ref={aboutNumRefs.current[index]}>
                    {statItem.count}
                  </span>
                  +
                </div>
                <div className={cx("about-count-text")}>{statItem.label}</div>
              </div>
            </div>
          ))}
        </div>

        <motion.div className={cx("about-adv-row")} ref={advRef}>
          {advAboutUs.map((advItem, index) => (
            <div key={advItem.title} className={cx("about-adv-col")}>
              <motion.div
                className={cx("about-adv")}
                variants={fadeInLeft(1, index / 2, 1)}
                initial="hidden"
                animate={isInView && "show"}
              >
                <img className={cx("about-icon")} src={advItem.icon} alt="" />
                <div className={cx("about-adv-tittle")}>{advItem.title}</div>
                <div className={cx("about-adv-text")}>{advItem.desc}</div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
