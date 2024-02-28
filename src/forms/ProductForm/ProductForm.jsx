import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./ProductForm.module.scss";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import { Button } from "@/components";
import { InputField, FileField, SelectField } from "@/forms/components";
import { useState } from "react";
import images from "@/assets/images";
import { useCreateProduct, useUpdateProduct } from "@/react-query/productQuery";
import message from "@/utils/message.js";

const cx = classNames.bind(styles);
const ProductForm = ({
  action,
  productEdit,
  setOpenCreate,
  setOpenEdit,
  setProductIdEdit,
  typeList,
}) => {
  const [productImg, setProductImg] = useState(
    productEdit?.data?.image
      ? productEdit?.data?.image
      : images.productImgDefault
  );

  const [isMoreType, setIsMoreType] = useState("");

  const { mutateAsync: createProduct, isPending: loadingCreate } =
    useCreateProduct();

  const { mutateAsync: updateProduct, isPending: loadingUpdate } =
    useUpdateProduct();

  const initialProduct = {
    name: productEdit?.data?.name ? productEdit.data?.name : "",
    image: productEdit?.data?.image ? productEdit.data?.image : "",
    type: productEdit?.data?.type ? productEdit.data?.type : "",
    newType: "",
    price: productEdit?.data?.price ? productEdit.data?.price : "",
    countInStock: productEdit?.data?.countInStock
      ? productEdit.data?.countInStock
      : "",
    description: productEdit?.data?.description
      ? productEdit.data?.description
      : "",
    discount: productEdit?.data?.discount ? productEdit.data?.discount : "",
  };

  const validateSchema = Yup.object({
    name: Yup.string().required("Name không được để trống ! "),
    price: Yup.number().required("Price không được để trống ! "),
    countInStock: Yup.number().required(
      "Count In Stock không được để trống ! "
    ),
  });

  const handleProductForm = async (values) => {
    let newValue = { ...values, image: productImg };
    if (isMoreType) {
      newValue.type = newValue.newType;
    }
    delete newValue.newType;
    let res = {};

    if (action === "Create") {
      newValue = { ...newValue, sell: 0 };
      res = await createProduct(newValue);
    } else {
      res = await updateProduct({
        ...newValue,
        id: productEdit?.data?._id,
      });
      setProductIdEdit("");
    }
    if (res.status !== "200") {
      message("error", res?.message);
    } else {
      message("success", res?.message);
      setOpenCreate(false);
      setOpenEdit(false);
    }
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("modal__overlay")}>
        <div className={cx("modal__body")}>
          <div className={cx("auth-form")}>
            <div className={cx("auth-form__container")}>
              <div className={cx("auth-form__header")}>{action} a Product</div>
              <div className={cx("auth-form__body")}>
                <div className={cx("auth-form__avatar")}>
                  <img
                    src={productEdit?.data?.image || productImg}
                    alt="avatar"
                  />
                </div>

                <div className={cx("auth-form__wrapper-form")}>
                  <Formik
                    initialValues={initialProduct}
                    validationSchema={validateSchema}
                    onSubmit={async (values) => await handleProductForm(values)}
                  >
                    {() => {
                      return (
                        <Form>
                          <FastField
                            name="name"
                            component={InputField}
                            label="Name"
                          />
                          <FastField
                            name="type"
                            component={SelectField}
                            label="Type "
                            selectList={[...typeList, "More type"]}
                            setIsMoreType={setIsMoreType}
                          />
                          {isMoreType && (
                            <FastField
                              name="newType"
                              component={InputField}
                              label="New Type"
                            />
                          )}

                          <FastField
                            name="price"
                            component={InputField}
                            label="Price"
                          />
                          <FastField
                            name="countInStock"
                            component={InputField}
                            label="In Stock"
                          />
                          <FastField
                            name="description"
                            component={InputField}
                            label="Description"
                            multiline
                            rows={3}
                          />
                          <FastField
                            name="image"
                            component={FileField}
                            label="Image Product"
                            type="file"
                            changeImg={setProductImg}
                          />

                          <div className={cx("auth-form_controls")}>
                            <Button
                              type="button"
                              className={cx("btn-back")}
                              onClick={() => {
                                setOpenCreate(false);
                                setOpenEdit(false);
                              }}
                            >
                              Back
                            </Button>

                            <Button
                              type="submit"
                              primary
                              disable={loadingCreate}
                            >
                              {loadingCreate || loadingUpdate
                                ? "Loading..."
                                : action}
                            </Button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductForm.propTypes = {
  action: PropTypes.string,
  typeList: PropTypes.array,
  productEdit: PropTypes.object,
  setOpenCreate: PropTypes.func,
  setOpenEdit: PropTypes.func,
  setProductIdEdit: PropTypes.func,
};

export default ProductForm;
