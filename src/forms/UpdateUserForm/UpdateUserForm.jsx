import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./UpdateUserForm.module.scss";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import { Button } from "@/components";
import { InputField } from "@/forms/components";
import message from "@/utils/message.js";
import { Modal } from "@/components";
import { useUpdateUser } from "@/react-query/userQuery";
import handleDecoded from "@/utils/jwtDecode";

const cx = classNames.bind(styles);
const UpdateUserForm = ({ userKey, currentValue, idUser, setOpenForm }) => {
  const { mutateAsync: updateUser, isPending: loadingUpdate } = useUpdateUser();

  const initialUser = {
    [userKey]: currentValue,
  };

  let validateSchema = Yup.object({});
  let label = "";

  if (userKey === "phone") {
    validateSchema = Yup.object({
      phone: Yup.number()
        .min(10, "Số điện thoại tối thiểu 10 chữ số!")
        .required("Số điện thoại không được để trống ! "),
    });

    label = "Số điện thoại";
  } else if (userKey === "address") {
    validateSchema = Yup.object({
      address: Yup.string().required("Địa chỉ không được để trống ! "),
    });

    label = "Địa chỉ";
  }

  const handleForm = async (value) => {
    const { storageData } = handleDecoded();
    const res = await updateUser({
      id: idUser,
      ...value,
      token: storageData,
    });

    if (res.status !== "200") {
      message("error", res?.message);
    } else {
      message("success", res?.message);
      setOpenForm(false);
    }
  };

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={validateSchema}
      onSubmit={async (values) => await handleForm(values)}
    >
      {({ resetForm, setValues }) => {
        return (
          <Form>
            <Modal>
              <div className={cx("update-user__container")}>
                <div className={cx("update-user__header")}>
                  Cập nhật {label}
                </div>
                <div className={cx("update-user__body")}>
                  <div className={cx("update-user__wrapper")}>
                    <div style={{ flex: 1 }}>
                      <FastField
                        name={userKey}
                        component={InputField}
                        label={label}
                        className={cx("update-user__input")}
                      />
                    </div>

                    <div>
                      <Button
                        type="button"
                        primary
                        onClick={() => {
                          setValues({ [userKey]: "" });
                        }}
                        className={cx("update-user__reset")}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className={cx("update-user__controls")}>
                    <Button
                      type="button"
                      className={cx("btn-back")}
                      onClick={() => setOpenForm(false)}
                    >
                      Trở lại
                    </Button>

                    <Button type="submit" primary disable={loadingUpdate}>
                      {loadingUpdate ? "Loading..." : "Cập nhật"}
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
};

UpdateUserForm.propTypes = {};

export default UpdateUserForm;
