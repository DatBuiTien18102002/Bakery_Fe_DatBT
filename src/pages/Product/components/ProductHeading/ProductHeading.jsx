import PropTypes from "prop-types";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./ProductHeading.module.scss";
import { Button } from "@/components";

const cx = classNames.bind(styles);
const ProductHeading = ({
  headingTitle,
  totalPage,
  typeProductList,
  filterList,
  activeSort,
  activeFindType,
  handleSelectSort,
  handleSelectFindByType,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className={cx("product-heading")}>
      <p className={cx("product-tittle")}>
        {headingTitle ? headingTitle : "Tất cả sản phẩm"}
      </p>

      <div className={cx("select-input")}>
        <FormControl
          sx={{ minWidth: 200, background: "white" }}
          size="small"
          className={cx("select-input")}
        >
          <InputLabel id="select-filter">Phân loại</InputLabel>
          <Select
            labelId="select-findByType"
            id="findByType"
            value={activeFindType}
            onChange={handleSelectFindByType}
            label="Phân loại"
          >
            {typeProductList?.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={cx("select-input")}>
        <FormControl
          sx={{ minWidth: 200, background: "white" }}
          size="small"
          className={cx("select-input")}
        >
          <InputLabel id="select-filter">Sắp xếp</InputLabel>
          <Select
            labelId="select-filter"
            id="filter"
            value={activeSort}
            onChange={handleSelectSort}
            label="Sắp xếp"
          >
            {filterList?.map((item, index) => (
              <MenuItem key={index} value={item.tittle}>
                {item.tittle}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={cx("product-page")}>
        <div className={cx("product-page__label")}>Trang: </div>
        <div className={cx("product-page__number")}>
          <span className={cx("product-page__current")}>{currentPage}</span>/
          <span className={cx("product-page__num-page")}>{totalPage}</span>
        </div>
        <div className={cx("product-page__control")}>
          <Button
            className={cx("product-btn")}
            onClick={handlePrevPage}
            disable={currentPage === 1}
          >
            <NavigateBeforeIcon />
          </Button>

          <Button
            className={cx("product-btn")}
            onClick={handleNextPage}
            disable={currentPage === totalPage}
          >
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductHeading.propTypes = {
  headingTitle: PropTypes.string,
  totalPage: PropTypes.number,
  filterList: PropTypes.array,
  typeProductList: PropTypes.array,
  activeFindType: PropTypes.string,
  activeSort: PropTypes.string,
  handleSelectSort: PropTypes.func,
  handleSelectFindByType: PropTypes.func,
  currentPage: PropTypes.number,
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
};

export default ProductHeading;
