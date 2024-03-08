import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ProductContent.module.scss";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import getPriceDiscount from "@/utils/getPriceDiscount";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import Rating from "@mui/material/Rating";
import currencyFormat from "@/utils/currencyFormat.js";
import CheckIcon from "@mui/icons-material/Check";

const cx = classNames.bind(styles);
const ProductContent = ({ urlPage, productList }) => {
  return (
    <div className={cx("product-content")}>
      <Grid container spacing={2} columns={{ xs: 12, md: 12, lg: 12 }}>
        {urlPage <= productList?.totalPage ? (
          productList?.data.map((productItem) => {
            let newPrice = 0;
            if (productItem?.discount) {
              newPrice = getPriceDiscount(
                productItem.price,
                productItem.discount
              );
            }

            return (
              <Grid key={productItem._id} item xs={6} md={4} lg={3}>
                <Link
                  to={`/Product/${productItem._id}`}
                  className={cx("product-item")}
                >
                  <div
                    className={cx("product-img")}
                    style={{
                      backgroundImage: `url(${productItem.image})`,
                    }}
                  />

                  <div className={cx("product-body")}>
                    <div className={cx("product-name")}>
                      <DiamondIcon />
                      <span>{productItem.name}</span>
                    </div>

                    <div className={cx("product-price")}>
                      <div
                        className={cx(
                          productItem.discount
                            ? "product-price--old"
                            : "product-price--new"
                        )}
                      >
                        {currencyFormat(productItem.price)}
                      </div>
                      {productItem.discount && (
                        <div className={cx("product-price--new")}>
                          {currencyFormat(newPrice)}
                        </div>
                      )}
                    </div>

                    <div className={cx("product-action")}>
                      <div className={cx("product-rate")}>
                        <Rating
                          name="read-only"
                          defaultValue={productItem.rating}
                          readOnly
                          size="small"
                          precision={0.1}
                        />
                      </div>

                      <div className={cx("product-sell")}>
                        Đã bán: {productItem?.sell ? productItem?.sell : 0}
                      </div>

                      <div className={cx("product-favorite")}>
                        <CheckIcon
                          className={cx("product-check-icon")}
                          style={{ fontSize: "0.563rem" }}
                        />
                        <span>Yêu thích</span>
                      </div>

                      {productItem?.discount && (
                        <div className={cx("product-sale")}>
                          <div className={cx("product-sale-percent")}>
                            {productItem?.discount}%
                          </div>

                          <div className={cx("product-sale-label")}>Giảm</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12}>
            Không tìm thấy
          </Grid>
        )}
      </Grid>
    </div>
  );
};

ProductContent.propTypes = {
  urlPage: PropTypes.number,
  productList: PropTypes.object,
};

export default ProductContent;
