import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./Discover.module.scss";
import { useGetAllProduct } from "@/react-query/productQuery";
import Button from "@/components/Button/Button";
import config from "@/config";
import DiscoverCakeItem from "./components/DiscoverCakeItem/DiscoverCakeItem";

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
                  <DiscoverCakeItem key={index} />
                ))}
              </>
            ) : (
              <>
                {newMenuDiscover?.map((menuItem) => (
                  <DiscoverCakeItem key={menuItem._id} item={menuItem} />
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
