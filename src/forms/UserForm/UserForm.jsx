import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./UserForm.module.scss";
import * as Yup from "yup";
import { FastField, Form, Formik } from "formik";
import { Button } from "@/components";
import { InputField, PassField, FileField } from "@/forms/components";
import { useState } from "react";
import images from "@/assets/images";
import { useCreateUser, useUpdateUser } from "@/react-query/userQuery";
import message from "@/utils/message.js";
import handleDecoded from "@/utils/jwtDecode";
import { Modal } from "@/components";

const cx = classNames.bind(styles);
const UserForm = ({
  action,
  userEdit,
  setOpenCreate,
  setOpenEdit,
  setUserIdEdit,
}) => {
  const [avatar, setAvatar] = useState(
    userEdit?.avatar ? userEdit?.avatar : images.avatarDefault
  );

  const { mutateAsync: createUser, isPending: loadingCreate } = useCreateUser();

  const { mutateAsync: updateUser, isPending: loadingUpdate } = useUpdateUser();

  const initialCreateUser = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    avatar: "",
  };

  const initialEditUser = {
    name: userEdit?.name ? userEdit?.name : "",
    email: userEdit?.email ? userEdit?.email : "",
    phone: userEdit?.phone ? userEdit?.phone : "",
    address: userEdit?.address ? userEdit?.address : "",
    avatar: userEdit?.avatar ? userEdit?.avatar : "",
  };

  const validateCreateSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống ! "),
    password: Yup.string()
      .min(6, "Mật khẩu phải tối thiểu 6 chữ số !")
      .required("Mật khẩu không được để trống !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp! ")
      .required("Nhập lại mật khẩu !"),
    phone: Yup.number().min(10, "Số điện thoại tối thiểu 10 chữ số!"),
  });

  const validateEditSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống ! "),
    phone: Yup.number().min(10, "Số điện thoại tối thiểu 10 chữ số!"),
  });

  const handleUserForm = async (values) => {
    const { storageData } = handleDecoded();
    const newValue = { ...values, avatar: avatar };
    let res = {};

    if (action === "Create") {
      res = await createUser(newValue);
    } else {
      res = await updateUser({
        ...newValue,
        id: userEdit?._id,
        token: storageData,
      });
      if (setUserIdEdit) {
        setUserIdEdit("");
      }
    }
    if (res.status !== "200") {
      message("error", res?.message);
    } else {
      message("success", res?.message);
      if (setOpenCreate) {
        setOpenCreate(false);
      }

      if (setOpenEdit) {
        setOpenEdit(false);
      }
    }
  };

  return (
    <Formik
      initialValues={action === "Create" ? initialCreateUser : initialEditUser}
      validationSchema={
        action === "Create" ? validateCreateSchema : validateEditSchema
      }
      onSubmit={async (values) => await handleUserForm(values)}
    >
      {() => {
        return (
          <Form>
            <Modal>
              <div className={cx("auth-form__container")}>
                <div className={cx("auth-form__header")}>{action} a User</div>
                <div className={cx("auth-form__body")}>
                  <div className={cx("auth-form__wrapper-avatar")}>
                    <div className={cx("auth-form__avatar")}>
                      <img src={userEdit?.avatar || avatar} alt="avatar" />
                    </div>

                    <FastField
                      name="avatar"
                      component={FileField}
                      label="Avatar"
                      type="file"
                      changeImg={setAvatar}
                    />
                  </div>

                  <div className={cx("auth-form__wrapper-form")}>
                    <div className={cx("auth-form__wrapper-fastFiled")}>
                      <FastField
                        name="name"
                        component={InputField}
                        label="Name"
                      />
                      <FastField
                        name="email"
                        component={InputField}
                        label="Email "
                      />
                      {action === "Create" ? (
                        <>
                          <FastField
                            name="password"
                            component={PassField}
                            label="Password"
                            type="password"
                          />
                          <FastField
                            name="confirmPassword"
                            component={PassField}
                            label="Confirm Password"
                            type="password"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                      <FastField
                        name="phone"
                        component={InputField}
                        label="Phone"
                      />
                      <FastField
                        name="address"
                        component={InputField}
                        label="Address"
                      />
                    </div>

                    <div className={cx("auth-form_controls")}>
                      <Button
                        type="button"
                        className={cx("btn-back")}
                        onClick={() => {
                          if (setOpenCreate) {
                            setOpenCreate(false);
                          }

                          if (setOpenEdit) {
                            setOpenEdit(false);
                          }
                        }}
                      >
                        Back
                      </Button>

                      <Button
                        type="submit"
                        primary
                        disable={loadingCreate || loadingUpdate}
                      >
                        {loadingCreate || loadingUpdate ? "Loading..." : action}
                      </Button>
                    </div>
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

UserForm.propTypes = {
  action: PropTypes.string,
  userEdit: PropTypes.object,
  setOpenCreate: PropTypes.func,
  setOpenEdit: PropTypes.func,
  setUserIdEdit: PropTypes.func,
};

export default UserForm;
