import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./CarouselBg.module.scss";
import Slider from "react-slick";
import images from "@/assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./customSlickDotActive.scss";
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
      style={{ ...style, display: "block", left: "45px", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

const CarouselBg = ({ imgList }) => {
  const settings = {
    dots: true,
    infinite: true,
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
          bottom: "50px",
        }}
      >
        <ul className={cx("custom-wrapper")}> {dots} </ul>
      </div>
    ),
    customPaging: () => <div className={cx("custom-dot")}></div>,
  };

  return (
    <section>
      <div className="slider-container" style={{ overflow: "hidden" }}>
        <Slider {...settings} style={{ width: "100%" }}>
          {imgList.map((image, index) => (
            <div key={index} className={cx("carousel-wrapper")}>
              <img src={image} alt="" className={cx("carousel-img")} />
              <h1 className={cx("carousel-tittle")}>
                <span className={cx("icon-wrapper")}>
                  <img
                    src={images.iconCarousel}
                    alt="Icon Bakery"
                    className={cx("icon-bakery")}
                  />
                  <p>Baroibeo</p>
                </span>
                <div className={cx("carousel-name")}>
                  <b> Tiệm bánh Baroibeo </b>
                </div>
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