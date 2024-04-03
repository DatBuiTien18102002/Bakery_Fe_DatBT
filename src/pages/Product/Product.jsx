import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import styles from "./Product.module.scss";
import { useGetProducts } from "@/react-query/productQuery";
import { ProductContent, ProductHeading, ProductSideBar } from "./components";

const cx = classNames.bind(styles);
const Product = () => {
  const [sortBy, setSortBy] = useState({ nameSort: "", type: "" });

  const [activeSort, setActiveSort] = useState("");
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

  const {
    data: productList,
    isPending: loadingProduct,
    refetch,
  } = useGetProducts({
    limit: searchParams.get("limit") || 7,
    page: currentPage,
    _sort: sortBy.nameSort,
    _order: sortBy.type,
  });

  console.log("LoadingProduct", loadingProduct);

  useEffect(() => {
    refetch();
  }, [currentPage, sortBy.nameSort, sortBy.type]);

  // sort product

  const handleSortClick = (objectQuery, active = "") => {
    setActiveSort(active);
    setSortBy(objectQuery);
  };

  const handleSelect = (event) => {
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

  // List sort
  const headingFilter = [
    {
      tittle: "Tên sản phẩm",
      name: "name",
    },
    {
      tittle: "Giá sản phẩm",
      name: "price",
    },
  ];

  const filterList = [
    {
      tittle: `A đến Z`,
      name: "name",
      type: "asc",
      heading: "",
    },
    {
      tittle: "Z đến A",
      name: "name",
      type: "desc",
    },
    {
      tittle: "Cao đến thấp",
      name: "price",
      type: "desc",
    },
    {
      tittle: "Thấp đến cao",
      name: "price",
      type: "asc",
    },
  ];

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
              handleSortClick={handleSortClick}
              filterList={filterList}
              headingFilter={headingFilter}
            />
          </div>
          <div className={cx("product-col")}>
            <ProductHeading
              totalPage={productList?.totalPage}
              filterList={filterList}
              activeSort={activeSort}
              handleSelect={handleSelect}
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
