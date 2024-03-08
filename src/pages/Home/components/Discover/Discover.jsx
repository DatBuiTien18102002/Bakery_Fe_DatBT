import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Discover.module.scss";
import { useGetAllProduct } from "@/react-query/productQuery";
import { Link } from "react-router-dom";
import DiamondIcon from "@/assets/images/DiamondIcon/Diamond.jsx";
import currencyFormat from "@/utils/currencyFormat";
import Button from "@/components/Button/Button";
import config from "@/config";
import getPriceDiscount from "@/utils/getPriceDiscount";

const cx = classNames.bind(styles);
const Discover = ({ menuDiscover }) => {
  const { data: allProduct } = useGetAllProduct();
  const allNameCakeMenu = menuDiscover.map((menuItem) => menuItem.name);

  const allProductMenuDiscover = allProduct?.data.filter((menuItem) =>
    allNameCakeMenu.includes(menuItem?.name)
  );

  const newMenuDiscover = allProductMenuDiscover?.map((menuItem) => {
    const newImageCake = menuDiscover.find(
      (item) => item.name === menuItem.name
    )?.image;

    return {
      ...menuItem,
      image: newImageCake,
    };
  });

  return (
    <section id="DiscoverMenu" className={cx("menu")}>
      <div className="container">
        <div className={cx("menu-wrapper")}>
          <div className={cx("menu-tittle")}>
            <h2>Khám phá menu</h2>
            <h6>Có gì đặc biệt ở đây</h6>
          </div>
          <div className={cx("menu-list")}>
            {newMenuDiscover?.map((menuItem) => (
              <Link
                to={`/Product/${menuItem._id}`}
                key={menuItem._id}
                className={cx("menu-item")}
              >
                <div className={cx("menu-img")}>
                  <img src={menuItem.image} alt="" />
                </div>

                <div className={cx("menu-item-info")}>
                  <div className={cx("menu-item-title")}>
                    <div className={cx("menu-item-name-wrapper")}>
                      <DiamondIcon />

                      <span>{menuItem.name}</span>
                    </div>
                    <div className={cx("menu-item-price")}>
                      {currencyFormat(
                        menuItem.discount
                          ? getPriceDiscount(menuItem.price, menuItem.discount)
                          : menuItem.price
                      )}
                    </div>
                  </div>

                  <div className={cx("menu-item-desc")}>
                    {menuItem.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Button outline className={cx("menu-btn")}>
            <Link className={cx("menu-link")} to={config.routes.product}>
              Xem thêm menu
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

Discover.propTypes = {
  menuDiscover: PropTypes.array,
};

export default Discover;
