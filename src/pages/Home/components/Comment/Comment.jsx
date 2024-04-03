import PropTypes from "prop-types";

import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import classNames from "classnames/bind";
import Slider from "react-slick";
import Rating from "@mui/material/Rating";

import "./CustomSlick.scss";
import styles from "./Comment.module.scss";

const cx = classNames.bind(styles);
const Comment = ({ comments }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id="Comment" className={cx("comment")}>
      <div className="container">
        <div className={cx("tittle", "comment-tittle")}>
          <h2>Đánh giá của khách hàng</h2>
          <DiamondIcon className="diamond-icon" />
        </div>

        <Slider {...settings} className={cx("comment-list")}>
          {comments.map((comment) => (
            <div key={comment.name} className={cx("comment-item")}>
              <div className={cx("comment-info")}>
                <img
                  src={comment.avatar}
                  alt=""
                  className={cx("comment-img")}
                />
                <div className={cx("comment-info-wrapper")}>
                  <div className={cx("comment-name")}>{comment.name}</div>
                  <Rating name="read-only" value={comment.star} readOnly />
                </div>
              </div>
              <div className={cx("comment-desc")}>{comment.desc}</div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

Comment.propTypes = {
  comments: PropTypes.array,
};

export default Comment;
