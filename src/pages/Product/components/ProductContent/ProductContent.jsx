import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { Grid } from "@mui/material";

import styles from "./ProductContent.module.scss";
import getPriceDiscount from "@/utils/getPriceDiscount";
import { NotFoundNumPage, ProductItem } from "./components";

const cx = classNames.bind(styles);
const ProductContent = ({
  urlPage,
  productList,
  loadingProduct = false,
  limitProduct = 7,
}) => {
  return (
    <div className={cx("product-content")}>
      <Grid container spacing={2} columns={{ xs: 12, md: 12, lg: 12 }}>
        {!loadingProduct ? (
          urlPage <= productList?.totalPage ? (
            <>
              {productList?.data.map((productItem) => {
                let newPrice = 0;
                if (productItem?.discount) {
                  newPrice = getPriceDiscount(
                    productItem.price,
                    productItem.discount
                  );
                }

                return (
                  <ProductItem
                    key={productItem._id}
                    item={productItem}
                    newPrice={newPrice}
                  />
                );
              })}
            </>
          ) : (
            <NotFoundNumPage />
          )
        ) : (
          <>
            {Array.from(Array(limitProduct)).map((_, index) => (
              <ProductItem key={index} />
            ))}
          </>
        )}
      </Grid>
    </div>
  );
};

ProductContent.propTypes = {
  urlPage: PropTypes.number,
  productList: PropTypes.object,
  loadingProduct: PropTypes.bool,
  limitProduct: PropTypes.number,
};

export default ProductContent;
