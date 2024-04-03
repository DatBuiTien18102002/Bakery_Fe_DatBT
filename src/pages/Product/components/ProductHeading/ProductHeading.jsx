import PropTypes from "prop-types";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import classNames from "classnames/bind";

import styles from "./ProductHeading.module.scss";
import { Button } from "@/components";

const cx = classNames.bind(styles);
const ProductHeading = ({
  totalPage,
  filterList,
  activeSort,
  handleSelect,
  currentPage,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className={cx("product-heading")}>
      <p className={cx("product-tittle")}>Tất cả sản phẩm</p>

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
            onChange={handleSelect}
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
  totalPage: PropTypes.number,
  filterList: PropTypes.array,
  activeSort: PropTypes.string,
  handleSelect: PropTypes.func,
  currentPage: PropTypes.number,
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
};

export default ProductHeading;
