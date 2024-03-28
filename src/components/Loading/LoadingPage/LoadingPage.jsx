import React from "react";
import styles from "./LoadingPage.module.scss";
import classNames from "classnames/bind";
import images from "@/assets/images";
import { fadeIn } from "@/utils/animation";
import { motion } from "framer-motion";

const cx = classNames.bind(styles);
const LoadingPage = () => {
  return (
    <motion.div
      variants={fadeIn(1)}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={cx("loading-wrapper")}
    >
      <div className={cx("loading-img")}>
        <img src={images.gifLoad} alt="loading" />
      </div>

      <div className={cx("loading-text")}>
        <span>Loading</span>
        <ul className={cx("loading-dots")}>
          <li>.</li>
          <li>.</li>
          <li>.</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default LoadingPage;
