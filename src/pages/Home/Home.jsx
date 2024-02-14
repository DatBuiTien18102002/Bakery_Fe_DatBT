import classNames from "classnames/bind";
import styles from "./Home.module.scss";

const cx = classNames.bind(styles);
const Home = () => {
  return <div className={cx("color-custom")}>Home</div>;
};

export default Home;
