import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Fragment } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./ProductSideBar.module.scss";

const cx = classNames.bind(styles);
const ProductSideBar = ({
  activeSort,
  activeFindType,
  handleFindByTypeClick,
  handleSortClick,
  filterList,
  typeProductList,
  headingFilter,
}) => {
  return (
    <div className={cx("product-sidebar")}>
      <div className={cx("product-find")}>
        <div className={cx("product-sidebar__tittle")}>
          <FilterAltIcon />
          Phân loại
        </div>

        <div
          className={cx("product-sidebar__item", {
            active: activeFindType === "",
          })}
          onClick={() => handleFindByTypeClick("")}
        >
          Mặc định
        </div>

        <div className={cx("product-sidebar__list")}>
          <div>
            <div className={cx("product-sidebar__heading")}>Loại sản phẩm</div>

            <ul>
              {typeProductList?.map((typeItem) => {
                return (
                  <li
                    key={typeItem}
                    className={cx("product-sidebar__item", {
                      active: typeItem === activeFindType,
                    })}
                    onClick={() => handleFindByTypeClick(typeItem)}
                  >
                    {typeItem}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={cx("product-filter")}>
        <div className={cx("product-sidebar__tittle")}>
          <SortIcon />
          Sắp xếp
        </div>

        <div
          className={cx("product-sidebar__item", {
            active: activeSort === "",
          })}
          onClick={() => handleSortClick({ nameSort: "", type: "" }, "")}
        >
          Mặc định
        </div>

        <div className={cx("product-sidebar__list")}>
          {headingFilter.map((headingFilter) => (
            <div key={headingFilter.tittle}>
              <div className={cx("product-sidebar__heading")}>
                {headingFilter.tittle}
              </div>

              <ul>
                {filterList.map((filterItem) => {
                  if (filterItem.name === headingFilter.name) {
                    return (
                      <li
                        key={filterItem.tittle}
                        className={cx("product-sidebar__item", {
                          active: filterItem.tittle === activeSort,
                        })}
                        onClick={() =>
                          handleSortClick(
                            {
                              nameSort: filterItem.name,
                              type: filterItem.type,
                            },
                            filterItem.tittle
                          )
                        }
                      >
                        {filterItem.tittle}
                      </li>
                    );
                  }
                  return <Fragment key={filterItem.tittle} />;
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ProductSideBar.propTypes = {
  activeSort: PropTypes.string,
  activeFindType: PropTypes.string,
  handleSortClick: PropTypes.func,
  handleFindByTypeClick: PropTypes.func,
  typeProductList: PropTypes.array,
  filterList: PropTypes.array,
  headingFilter: PropTypes.array,
};

export default ProductSideBar;
