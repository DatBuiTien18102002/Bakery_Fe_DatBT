import PropTypes from "prop-types";

import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./DiscoverCakeItem.module.scss";
import { Skeleton } from "@/components";
import currencyFormat from "@/utils/currencyFormat";
import getPriceDiscount from "@/utils/getPriceDiscount";

const cx = classNames.bind(styles);

const DiscoverCakeItem = ({ item }) => {
  return (
    <Link to={item ? `/Product/${item._id}` : `#`} className={cx("menu-item")}>
      <div className={cx(item ? "menu__img-wrap" : "menu-loading__img-wrap")}>
        {item ? (
          <img src={item.image} alt="" className={cx("menu-img")} />
        ) : (
          <Skeleton />
        )}
      </div>

      <div className={cx("menu-item-info")}>
        <div className={cx("menu-item-title")}>
          <div className={cx("menu-item-name-wrapper")}>
            <DiamondIcon />

            {item ? (
              <span>{item.name}</span>
            ) : (
              <Skeleton
                width="100px"
                height="20px"
                className={cx("skeleton-title")}
              />
            )}
          </div>
          <div className={cx("menu-item-price")}>
            {item ? (
              currencyFormat(
                item.discount
                  ? getPriceDiscount(item.price, item.discount)
                  : item.price
              )
            ) : (
              <Skeleton
                width="62px"
                height="20px"
                className={cx("skeleton-price")}
              />
            )}
          </div>
        </div>

        <div className={cx("menu-item-desc")}>
          {item ? item.description : <Skeleton height="48px" />}
        </div>
      </div>
    </Link>
  );
};

DiscoverCakeItem.propTypes = {
  item: PropTypes.object,
};

export default DiscoverCakeItem;
