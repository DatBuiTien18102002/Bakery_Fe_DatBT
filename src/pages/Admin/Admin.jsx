import { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Admin.module.scss";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AppsIcon from "@mui/icons-material/Apps";
import AdminProduct from "./components/AdminProduct/AdminProduct";
import AdminUser from "./components/AdminUser/AdminUser";

const cx = classNames.bind(styles);
const Admin = () => {
  const [page, setPage] = useState("user");
  const [btnActive, setBtnActive] = useState("user");

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
  ];

  const handleShowPage = (key) => {
    setBtnActive(key);
    setPage(key);
  };

  const renderPage = () => {
    switch (page) {
      case "user":
        return <AdminProduct />;
      case "product":
        return <AdminUser />;
      default:
        return <></>;
    }
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
      <div className="content">{renderPage()}</div>
    </div>
  );
};

Admin.propTypes = {};

export default Admin;
