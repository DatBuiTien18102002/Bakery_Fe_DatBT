import classNames from "classnames/bind";
import { Grid } from "@mui/material";

import styles from "./NotFoundNumPage.module.scss";
import images from "@/assets/images";

const cx = classNames.bind(styles);
const NotFoundNumPage = () => {
  return (
    <Grid item xs={12}>
      <div className={cx("product__notFound-wrapper")}>
        <img
          src={images.pageProductNotFound}
          alt=""
          className={cx("product__notFound-img")}
        />
        <p>Trang bạn truy cập không tồn tại hoặc đã bị xóa</p>
      </div>
    </Grid>
  );
};

export default NotFoundNumPage;
