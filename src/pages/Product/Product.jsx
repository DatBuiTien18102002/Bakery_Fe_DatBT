import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import styles from "./Product.module.scss";
import { useGetProducts, useGetAllType } from "@/react-query/productQuery";
import { ProductContent, ProductHeading, ProductSideBar } from "./components";
import { headingFilter, filterList } from "@/constants";

const cx = classNames.bind(styles);
const Product = () => {
  const [sortBy, setSortBy] = useState({ nameSort: "", type: "" });
  const [findByType, setFindByType] = useState("");

  const [activeSort, setActiveSort] = useState("");
  const [activeFindType, setActiveFindType] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (searchParams.get("page") || searchParams.get("page") >= 1) {
      setCurrentPage(+searchParams.get("page"));
    } else {
      setSearchParams({
        limit: searchParams.get("limit") || 7,
        page: currentPage,
      });
    }
  }, [searchParams.get("page")]);

  const { data: typeProductList } = useGetAllType();

  const queryFilter = {
    limit: searchParams.get("limit") || 7,
    page: currentPage,
    _sort: sortBy.nameSort,
    _order: sortBy.type,
    type: findByType,
  };

  if (!findByType) {
    delete queryFilter.type;
  }

  const {
    data: productList,
    isPending: loadingProduct,
    refetch,
  } = useGetProducts(queryFilter);

  useEffect(() => {
    setSearchParams({ limit: searchParams.get("limit") || 7, page: 1 });
  }, [findByType]);

  useEffect(() => {
    refetch();
  }, [currentPage, sortBy.nameSort, sortBy.type, findByType]);

  // sort product

  const handleSortClick = (objectQuery, active = "") => {
    setActiveSort(active);
    setSortBy(objectQuery);
  };

  const handleFindByTypeClick = (type) => {
    setActiveFindType(type);
    setFindByType(type);
  };

  const handleSelectSort = (event) => {
    const selectedFilter = filterList.find(
      (item) => item.tittle === event.target.value
    );

    handleSortClick(
      {
        nameSort: selectedFilter.name,
        type: selectedFilter.type,
      },
      selectedFilter.tittle
    );
  };

  const handleSelectFindByType = (event) => {
    handleFindByTypeClick(event.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) {
      return;
    }
    setSearchParams({
      limit: searchParams.get("limit"),
      page: +searchParams.get("page") - 1,
    });
  };

  const handleNextPage = () => {
    if (currentPage === productList?.totalPage) {
      return;
    }
    setSearchParams({
      limit: searchParams.get("limit"),
      page: +searchParams.get("page") + 1,
    });
  };

  const handleChangePaginate = (event, value) => {
    setSearchParams({ limit: searchParams.get("limit"), page: value });
  };

  return (
    <div className={cx("product")}>
      <div className="container">
        <div className={cx("product-row")}>
          <div className={cx("product-col")}>
            <ProductSideBar
              activeSort={activeSort}
              activeFindType={activeFindType}
              handleFindByTypeClick={handleFindByTypeClick}
              handleSortClick={handleSortClick}
              filterList={filterList}
              typeProductList={typeProductList?.allType}
              headingFilter={headingFilter}
            />
          </div>
          <div className={cx("product-col")}>
            <ProductHeading
              headingTitle={activeFindType}
              totalPage={productList?.totalPage}
              filterList={filterList}
              typeProductList={typeProductList?.allType}
              activeSort={activeSort}
              activeFindType={activeFindType}
              handleSelectSort={handleSelectSort}
              handleSelectFindByType={handleSelectFindByType}
              currentPage={currentPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />

            <ProductContent
              urlPage={+searchParams.get("page")}
              productList={productList}
              loadingProduct={loadingProduct}
              limitProduct={+searchParams.get("limit")}
            />

            <div className={cx("pagination")}>
              <Pagination
                count={productList?.totalPage}
                shape="rounded"
                color="primary"
                page={currentPage}
                size="large"
                onChange={handleChangePaginate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
