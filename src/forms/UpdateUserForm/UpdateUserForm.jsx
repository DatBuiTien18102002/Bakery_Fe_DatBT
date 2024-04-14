import PropTypes from "prop-types";

import classNames from "classnames/bind";
import { FastField, Form, Formik } from "formik";

import styles from "./UpdateUserForm.module.scss";
import message from "@/utils/message.js";
import handleDecoded from "@/utils/jwtDecode";
import { Button } from "@/components";
import { InputField } from "@/forms/components";
import { Modal } from "@/components";
import { useUpdateUser } from "@/react-query/userQuery";
import { validateUpdateUser } from "@/forms/validateSchema";

const cx = classNames.bind(styles);
const UpdateUserForm = ({ userKey, currentValue, idUser, setOpenForm }) => {
  const { mutateAsync: updateUser, isPending: loadingUpdate } = useUpdateUser();

  const initialUser = {
    [userKey]: currentValue,
  };

  let label = "";

  if (userKey === "phone") {
    label = "Số điện thoại";
  } else if (userKey === "address") {
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
      validationSchema={validateUpdateUser(userKey)}
      onSubmit={async (values) => await handleForm(values)}
    >
      {({ setValues }) => {
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

UpdateUserForm.propTypes = {
  userKey: PropTypes.string,
  currentValue: PropTypes.any,
  idUser: PropTypes.string,
  setOpenForm: PropTypes.func,
};

export default UpdateUserForm;
