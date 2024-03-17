import classNames from "classnames/bind";
import styles from "./ProfileForm.module.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import images from "@/assets/images";
import { FastField, Formik, Form } from "formik";
import { InputField, FileField } from "@/forms/components";
import { useUpdateUser } from "@/react-query/userQuery";
import message from "@/utils/message.js";
import handleDecoded from "@/utils/jwtDecode";
import { Button } from "@/components";
import { useState } from "react";
import { updateUser } from "@/redux/slice/userSlice";

const cx = classNames.bind(styles);

const ProfileForm = () => {
  const currentUser = useSelector((state) => state.user);

  const [avatar, setAvatar] = useState(
    currentUser?.avatar ? currentUser?.avatar : images.avatarDefault
  );

  const { mutateAsync: updateProfile, isPending: loadingUpdate } =
    useUpdateUser();

  const dispatch = useDispatch();

  const initialUser = {
    name: currentUser?.name ? currentUser?.name : "",
    email: currentUser?.email ? currentUser?.email : "",
    phone: currentUser?.phone ? currentUser?.phone : "",
    address: currentUser?.address ? currentUser?.address : "",
    avatar: currentUser?.avatar ? currentUser?.avatar : images.avatarDefault,
  };

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống ! "),
    phone: Yup.number().min(10, "Số điện thoại tối thiểu 10 chữ số!"),
  });

  const handleUserForm = async (values) => {
    const { storageData } = handleDecoded();
    const newValue = { ...values, avatar: avatar };

    const res = await updateProfile({
      ...newValue,
      id: currentUser?._id,
      token: storageData,
    });

    if (res.status !== "200") {
      message("error", res?.message);
    } else {
      message("success", res?.message);
      dispatch(updateUser(res.data));
    }
  };

  // console.log("--------current User", currentUser);

  return (
    <Formik
      initialValues={initialUser}
      validationSchema={validateSchema}
      onSubmit={async (values) => await handleUserForm(values)}
    >
      {() => {
        return (
          <Form>
            <div className={cx("modal")}>
              <div className={cx("modal__body")}>
                <div className={cx("auth-form")}>
                  <div className={cx("auth-form__container")}>
                    <div className={cx("auth-form__header")}>User Profile</div>
                    <div className={cx("auth-form__body")}>
                      <div className={cx("auth-form__avatar")}>
                        <img
                          src={avatar || images.avatarDefault}
                          alt="avatar"
                        />
                      </div>
                      <div className={cx("auth-form__wrapper-form")}>
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
                        <FastField
                          name="avatar"
                          component={FileField}
                          label="Avatar"
                          type="file"
                          changeImg={setAvatar}
                        />
                        <div className={cx("auth-form_controls")}>
                          <Button
                            type="submit"
                            primary
                            rounded
                            disable={loadingUpdate}
                          >
                            {loadingUpdate ? "Loading..." : "Update"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
