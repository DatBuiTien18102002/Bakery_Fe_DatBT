import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { CarouselBg, Introduce, TimeService } from "./components";
import images from "@/assets/images";

const cx = classNames.bind(styles);
const Home = () => {
  return (
    <div className="page">
      <CarouselBg imgList={images.carousel} />
      <Introduce />
      <TimeService />
    </div>
  );
};

export default Home;
