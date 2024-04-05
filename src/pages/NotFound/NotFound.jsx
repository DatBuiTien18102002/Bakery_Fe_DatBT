import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import classNames from "classnames/bind";

import { Button } from "@/components";
import config from "@/config";
import styles from "./NotFound.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);

const NotFound = () => {
  return (
    <div className={cx("not-found")}>
      <div className={cx("not-found__wrapper")}>
        <img src={images.notFound} alt="" className={cx("not-found__img")} />
        <Button
          to={config.routes.home}
          primary
          className={cx("not-found__back")}
          leftIcon={<KeyboardArrowLeftIcon />}
          rounded
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
