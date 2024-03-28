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
import LoadingPage from "@/components/Loading/LoadingPage/LoadingPage";
import { AnimatePresence } from "framer-motion";
// import { Skeleton } from "@mui/material";
import { Skeleton } from "@/components";

const cx = classNames.bind(styles);
const Discover = ({ menuDiscover }) => {
  const { data: allProduct, isPending: loadingProduct } = useGetAllProduct();
  const allNameCakeMenu = menuDiscover.map((menuItem) => menuItem.name);

  console.log("loading", loadingProduct);

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
            {loadingProduct == true ? (
              <>
                {Array.from(Array(6)).map((_, index) => (
                  <div key={index} className={cx("menu-item")}>
                    <div className={cx("menu-loading__img-wrap")}>
                      <Skeleton />
                    </div>

                    <div className={cx("menu-item-info")}>
                      <div className={cx("menu-item-title")}>
                        <div className={cx("menu-item-name-wrapper")}>
                          <DiamondIcon />
                          <Skeleton
                            width="100px"
                            height="20px"
                            className={cx("skeleton-title")}
                          />
                        </div>
                        <div className={cx("menu-item-price")}>
                          <Skeleton
                            width="62px"
                            height="20px"
                            className={cx("skeleton-price")}
                          />
                        </div>
                      </div>

                      <div className={cx("menu-item-desc")}>
                        <Skeleton height="48px" />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {newMenuDiscover?.map((menuItem) => (
                  <Link
                    to={`/Product/${menuItem._id}`}
                    key={menuItem._id}
                    className={cx("menu-item")}
                  >
                    <div className={cx("menu__img-wrap")}>
                      <img
                        src={menuItem.image}
                        alt=""
                        className={cx("menu-img")}
                      />
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
                              ? getPriceDiscount(
                                  menuItem.price,
                                  menuItem.discount
                                )
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
              </>
            )}
          </div>

          <Button outline className={cx("menu-btn")}>
            <Link className={cx("menu-link")} to={config.routes.product}>
              Xem thêm menu
            </Link>
          </Button>
        </div>
      </div>

      {/* <AnimatePresence>{loadingProduct && <LoadingPage />}</AnimatePresence> */}
    </section>
  );
};

Discover.propTypes = {
  menuDiscover: PropTypes.array,
};

export default Discover;
