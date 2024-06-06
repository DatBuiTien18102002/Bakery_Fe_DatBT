import {
  CarouselBg,
  Comment,
  Discover,
  ImgShop,
  Introduce,
  TimeService,
} from "./components";
import images from "@/assets/images";

const Home = () => {
  return (
    <div>
      <CarouselBg imgList={images.carousel} />
      <Introduce />
      <Discover />
      <Comment />
      <TimeService />
      <ImgShop />
    </div>
  );
};

export default Home;
