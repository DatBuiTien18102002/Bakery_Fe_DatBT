import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import {
  CarouselBg,
  Comment,
  Discover,
  ImgShop,
  Introduce,
  TimeService,
} from "./components";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const MENU_DISCOVER = [
  {
    image: images.discoverCake.cupcake,
    name: "Cupcake Chocolate",
  },
  {
    image: images.discoverCake.tiramisu,
    name: "Tiramisu Cake",
  },
  {
    image: images.discoverCake.fritter,
    name: "Dorayaki Cake",
  },
  {
    image: images.discoverCake.donut,
    name: "Donut Cake",
  },
  {
    image: images.discoverCake.pancake,
    name: "Pancake Cake",
  },
  {
    image: images.discoverCake.strawberryCake,
    name: "Chocolate Cake",
  },
];

const COMMENTS = [
  {
    avatar: images.commentAvatar.avatar1,
    name: "Anh Dương Lâm",
    star: 4,
    desc: "Tôi rất thích đưa gia đình đến đây vì phong cách rất chuyên nghiệp, bánh ngon và không gian quán cũng rất đẹp và sang trọng.",
  },
  {
    avatar: images.commentAvatar.avatar2,
    name: "Chị Đức Bo",
    star: 3,
    desc: "Trai ở đây rất đẹp, tôi là người thích sống ảo nên rất thích đến đây để chụp những tấm ảnh đẹp cùng bạn bè, theo mình thì đây cũng là nơi lý tưởng để hẹn hò.",
  },
  {
    avatar: images.commentAvatar.avatar3,
    name: "Anh Tấn Trung",
    star: 5,
    desc: "Mình rất hài lòng về thái độ phục vụ của quán , chủ quán rất đẹp trai thân thiện, bánh rất ngon, mình sẽ còn mua bánh ở đây nhiều lần nữa.",
  },
  {
    avatar: images.commentAvatar.avatar4,
    name: "Anh Bray",
    star: 4,
    desc: "Mình rất hài lòng về thái độ phục vụ của quán, bánh rất ngon, mình sẽ còn mua bánh ở đây nhiều lần nữa.",
  },
];

const Home = () => {
  return (
    <div className="page">
      <CarouselBg imgList={images.carousel} />
      <Introduce />
      <Discover menuDiscover={MENU_DISCOVER} />
      <Comment comments={COMMENTS} />
      <TimeService />
      <ImgShop />
    </div>
  );
};

export default Home;
