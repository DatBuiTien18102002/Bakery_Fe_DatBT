import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Admin.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminUser from "./components/AdminUser/AdminUser";
import AdminOrder from "./components/AdminOrder/AdminOrder";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AppsIcon from "@mui/icons-material/Apps";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { backInLeft, fadeIn } from "@/utils/animation";

const cx = classNames.bind(styles);
const Admin = () => {
  const [page, setPage] = useState("user");
  const [btnActive, setBtnActive] = useState("user");
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const Menu = [
    {
      title: "Nguời dùng",
      key: "user",
      icon: PersonOutlineIcon,
    },
    {
      title: "Sản phẩm",
      key: "product",
      icon: AppsIcon,
    },
    {
      title: "Đơn hàng",
      key: "order",
      icon: ShoppingCartIcon,
    },
  ];

  const handleShowPage = (key) => {
    setBtnActive(key);
    setPage(key);
    setIsOpenSideBar(false);
  };

  const renderPage = () => {
    switch (page) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      default:
        return <></>;
    }
  };

  const handelSizeBar = () => {
    setIsOpenSideBar((prev) => !prev);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("sidebar")}>
        {Menu.map((menuItem) => {
          const Icon = menuItem.icon;
          return (
            <div
              key={menuItem.key}
              className={cx("sidebar-button", {
                active: menuItem.key === btnActive,
              })}
              onClick={() => {
                handleShowPage(menuItem.key);
              }}
            >
              <Icon style={{ fontSize: 27 }} className={cx("sidebar-icon")} />
              {menuItem.title}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {isOpenSideBar && (
          <motion.div
            variants={backInLeft(1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className={cx("sidebar-mobile")}
          >
            <div className={cx("heading-sidebar")}>
              <div className={cx("sidebar-logo")}>Baroibeo</div>

              <CancelIcon
                sx={{ fontSize: 35 }}
                className={cx("close-btn")}
                onClick={handelSizeBar}
              />
            </div>

            {Menu.map((menuItem) => {
              const Icon = menuItem.icon;
              return (
                <div
                  key={menuItem.key}
                  className={cx("sidebar-button-mobile", {
                    active: menuItem.key === btnActive,
                  })}
                  onClick={() => {
                    handleShowPage(menuItem.key);
                  }}
                >
                  <Icon
                    style={{ fontSize: 27 }}
                    className={cx("sidebar-icon")}
                  />
                  {menuItem.title}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cx("content")}>
        <div className={cx("content-wrapper")}>
          <div className={cx("menu-mobile-btn")} onClick={handelSizeBar}>
            <MenuIcon className={cx("menu-icon")} />
          </div>

          <AnimatePresence>
            {isOpenSideBar && (
              <motion.div
                variants={fadeIn(1)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className={cx("admin__overplay")}
                onClick={handelSizeBar}
              ></motion.div>
            )}
          </AnimatePresence>

          {renderPage()}
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {};

export default Admin;
