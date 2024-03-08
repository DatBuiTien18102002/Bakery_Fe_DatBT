import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ProductSideBar.module.scss";
import { Fragment } from "react";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

const cx = classNames.bind(styles);
const ProductSideBar = ({
  activeSort,
  handleSortClick,
  filterList,
  headingFilter,
}) => {
  return (
    <div className={cx("product-filter")}>
      <div className={cx("product-filter__tittle")}>
        <FilterAltIcon />
        Sắp xếp
      </div>

      <div
        className={cx("product-filter__item", {
          active: activeSort === "",
        })}
        onClick={() => handleSortClick({ nameSort: "", type: "" }, "")}
      >
        Tất cả
      </div>

      <div className={cx("product-filter__list")}>
        {headingFilter.map((headingFilter) => (
          <div key={headingFilter.tittle}>
            <div className={cx("product-filter__heading")}>
              {headingFilter.tittle}
            </div>

            <ul>
              {filterList.map((filterItem) => {
                if (filterItem.name === headingFilter.name) {
                  return (
                    <li
                      key={filterItem.tittle}
                      className={cx("product-filter__item", {
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
  );
};

ProductSideBar.propTypes = {
  activeSort: PropTypes.string,
  handleSortClick: PropTypes.func,
  filterList: PropTypes.array,
  headingFilter: PropTypes.array,
};

export default ProductSideBar;
