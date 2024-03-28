import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useGetDetailProduct } from "@/react-query/productQuery";

const cx = classNames.bind(styles);
const Breadcrumb = ({ bgColor }) => {
  const location = useLocation();

  const pathList = location.pathname.split("/").filter((path) => path !== "");
  let idProduct;

  if (pathList[pathList.length - 2] === "product") {
    idProduct = pathList[pathList.length - 1];
  }

  const { data: productDetail, isLoading: loadingProduct } =
    useGetDetailProduct(idProduct);

  if (productDetail?.status === "200") {
    pathList.pop();
    pathList.push(productDetail?.data?.name);
  }

  const pathActive = pathList[pathList.length - 1];
  pathList.pop();

  function convertToTitleCase(str) {
    const upperFirstLetter = str.charAt(0).toUpperCase() + str.slice(1);
    const word = upperFirstLetter.split("-");
    return word.join(" ");
  }
  console.log("pathActive", pathActive);
  return (
    <div className="container">
      <div className={cx("breadcrumb-wrapper")}>
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{ backgroundColor: bgColor }}
          className={cx("breadcrumb")}
        >
          <Link color="inherit" to="/" className={cx("breadcrumb-hover")}>
            Home
          </Link>
          {pathList?.map((pathItem, index) => (
            <Link
              key={index}
              color="inherit"
              to={`/${pathItem}`}
              className={cx("breadcrumb-hover")}
            >
              {convertToTitleCase(pathItem)}
            </Link>
          ))}
          <Typography color="primary" className={cx("breadcrumb-active")}>
            {convertToTitleCase(pathActive)}
          </Typography>
        </Breadcrumbs>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  bgColor: PropTypes.string,
};

export default Breadcrumb;
