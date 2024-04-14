import * as Yup from "yup";

const validateSignIn = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống ! "),
    password: Yup.string()
        .min(6, "Mật khẩu phải tối thiểu 6 chữ số !")
        .required("Mật khẩu không được để trống !"),
});

const validateSignUp = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống ! "),
    password: Yup.string()
        .min(6, "Mật khẩu phải tối thiểu 6 chữ số !")
        .required("Mật khẩu không được để trống !"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp! ")
        .required("Nhập lại mật khẩu !"),
});

const validateProduct = Yup.object({
    name: Yup.string().required("Name không được để trống ! "),
    price: Yup.number().required("Price không được để trống ! "),
    countInStock: Yup.number().required(
        "Count In Stock không được để trống ! "
    ),
    type: Yup.string().required("type không được để trống ! "),
});

const validateProfile = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống ! "),
    phone: Yup.number().min(10, "Số điện thoại tối thiểu 10 chữ số!"),
});

let validateUpdateUser = (userKey) => {
    let validateSchema = Yup.object({});

    if (userKey === "phone") {
        validateSchema = Yup.object({
            phone: Yup.number()
                .min(10, "Số điện thoại tối thiểu 10 chữ số!")
                .required("Số điện thoại không được để trống ! "),
        });
        return validateSchema
    } else if (userKey === "address") {
        validateSchema = Yup.object({
            address: Yup.string().required("Địa chỉ không được để trống ! "),
        });
        return validateSchema
    }
}

const validateCreateUser = Yup.object({
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

const validateEditUser = Yup.object({
    email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email không được để trống ! "),
    phone: Yup.number().min(10, "Số điện thoại tối thiểu 10 chữ số!"),
});

export {
    validateSignIn,
    validateSignUp,
    validateProduct,
    validateProfile,
    validateUpdateUser,
    validateCreateUser,
    validateEditUser
}