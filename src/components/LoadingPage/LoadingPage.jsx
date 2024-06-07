import classNames from "classnames/bind";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/animation";

import styles from "./LoadingPage.module.scss";
import images from "@/assets/images";
import LoadingText from "../LoadingText/LoadingText";

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

      <LoadingText fontSize="1.5rem" color="white" />
    </motion.div>
  );
};

export default LoadingPage;
