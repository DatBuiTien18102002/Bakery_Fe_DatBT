import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UserMenu.module.scss";
import HeadlessTippy from "@tippyjs/react/headless";

import { useState } from "react";
import Wrapper from "../Wrapper/Wrapper";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import MenuItem from "../MenuItem/MenuItem";

const cx = classNames.bind(styles);

function UserMenu({
  children,
  items = [],
  arrow = false,
  hideOnClick = false,
}) {
  const [history, setHistory] = useState([{ data: items }]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              item.onClick();
            }
          }}
        />
      );
    });
  };

  const handleBack = () => {
    setHistory((prev) => prev.slice(0, history.length - 1));
  };

  const renderResult = (attrs) => (
    <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
      <Wrapper arrow={arrow} className={cx("menu-popper")}>
        {history.length > 1 && (
          <HeaderMenu tittle={current.tittle} onBack={handleBack} />
        )}
        <div className={cx("body-menu")}>{renderItems()}</div>
      </Wrapper>
    </div>
  );

  const handleResultOnHide = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <div>
      <HeadlessTippy
        interactive
        hideOnClick={hideOnClick}
        // delay={[0, 700]}
        placement="bottom-end"
        offset={[17, 17]} //Chỉnh vị trí headlesstippy
        render={renderResult}
        onHide={handleResultOnHide}
      >
        {children}
      </HeadlessTippy>
    </div>
  );
}

UserMenu.propTypes = {
  children: PropTypes.node.isRequired,
  arrow: PropTypes.bool,
  items: PropTypes.array,
  hideOnClick: PropTypes.func,
  onClick: PropTypes.func,
};

export default UserMenu;
