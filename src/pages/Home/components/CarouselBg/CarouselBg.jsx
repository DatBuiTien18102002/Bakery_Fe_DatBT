import PropTypes from "prop-types";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames/bind";
import Slider from "react-slick";

import images from "@/assets/images";
import styles from "./CarouselBg.module.scss";
import { ImageCustom, LoadingText } from "@/components";

import "./customSlickDotActive.scss";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
const cx = classNames.bind(styles);

function SampleNextArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={cx("carousel-arrow", className)}
      style={{
        ...style,
        display: "block",
        right: "45px",
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  // eslint-disable-next-line react/prop-types
  const { className, style, onClick } = props;
  return (
    <div
      className={cx("carousel-arrow", className)}
      style={{
        ...style,
        display: "block",
        left: "45px",
        zIndex: 1,
        color: "white",
      }}
      onClick={onClick}
    />
  );
}

const CarouselBg = ({ imgList }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "10px",
        }}
      >
        <ul className={cx("custom-wrapper")}> {dots} </ul>
      </div>
    ),
    customPaging: () => <div className={cx("custom-dot")}></div>,
  };

  const ref = useRef();
  const isInView = useInView(ref, { margin: `-200px` });
  const [addAnimate, setAddAnimate] = useState(false);

  useEffect(() => {
    if (isInView) {
      setAddAnimate(true);
    }
  }, [isInView]);

  return (
    <section ref={ref}>
      <div className={cx("slider-container")} style={{ overflow: "hidden" }}>
        <p className={cx("loading-img")}>
          <LoadingText fontSize="1.5rem" />
        </p>
        <Slider {...settings} className={cx("slider-wrapper")}>
          {imgList.map((image, index) => (
            <div key={index} className={cx("carousel-wrapper")}>
              <ImageCustom
                src={image.src}
                hash={image.hash}
                className={cx("carousel-img")}
              />
              <h1 className={cx("carousel-tittle")}>
                <span className={cx("icon-wrapper")}>
                  <img
                    src={images.iconCarousel}
                    alt="Icon Bakery"
                    className={cx(
                      "icon-bakery",
                      `animate__animated ${
                        addAnimate && "animate__fadeInDown "
                      } `
                    )}
                  />
                  <p
                    className={cx(
                      `animate__animated ${
                        addAnimate && "animate__backInDown animate__delay-0.5s"
                      } `
                    )}
                  >
                    Baroibeo
                  </p>
                  <b
                    className={cx(
                      "carousel-name",
                      `animate__animated ${
                        addAnimate && "animate__tada"
                      } animate__delay-1s`
                    )}
                  >
                    Tiệm bánh Baroibeo
                  </b>
                </span>
              </h1>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

CarouselBg.propTypes = {
  imgList: PropTypes.array,
};

export default CarouselBg;
