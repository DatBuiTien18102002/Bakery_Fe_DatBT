import PropTypes from "prop-types";

import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import CheckIcon from "@mui/icons-material/Check";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

import styles from "./ProductItem.module.scss";
import currencyFormat from "@/utils/currencyFormat.js";
import { Skeleton } from "@/components";

const cx = classNames.bind(styles);

const ProductItem = ({ item, newPrice }) => {
  return (
    <Grid item xs={6} md={4} lg={3}>
      <Link
        to={item ? `/product/${item._id}` : "#"}
        className={cx("product-item")}
      >
        {item ? (
          <div
            className={cx("product-img")}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          />
        ) : (
          <Skeleton height="0px" className={cx("product-img")} />
        )}

        <div className={cx("product-body")}>
          <div className={cx("product-name")}>
            <DiamondIcon />
            {item ? (
              <span>{item.name}</span>
            ) : (
              <Skeleton
                width="100px"
                height="22px"
                className={cx("skeleton-title")}
              />
            )}
          </div>

          <div className={cx("product-price")}>
            <div
              className={cx(
                item?.discount || !item
                  ? "product-price--old"
                  : "product-price--new"
              )}
            >
              {item ? (
                currencyFormat(item.price)
              ) : (
                <Skeleton width="53px" height="18px" />
              )}
            </div>
            {item?.discount || !item ? (
              <div className={cx("product-price--new")}>
                {item ? (
                  currencyFormat(newPrice)
                ) : (
                  <Skeleton
                    width="80px"
                    height="24px"
                    className={cx("skeleton__old-price")}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className={cx("product-action")}>
            <div className={cx("product-rate")}>
              <Rating
                name="read-only"
                value={item ? item.rating : 0}
                readOnly
                size="small"
                precision={0.1}
              />
            </div>

            <div className={cx("product-sell")}>
              Đã bán: {item?.sell && item ? item?.sell : 0}
            </div>

            <div className={cx("product-favorite")}>
              <CheckIcon
                className={cx("product-check-icon")}
                style={{ fontSize: "0.563rem" }}
              />
              <span>Yêu thích</span>
            </div>

            {item?.discount && item && (
              <div className={cx("product-sale")}>
                <div className={cx("product-sale-percent")}>
                  {item?.discount}%
                </div>

                <div className={cx("product-sale-label")}>Giảm</div>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Grid>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
  newPrice: PropTypes.number,
};

export default ProductItem;
