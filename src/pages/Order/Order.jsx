import { useEffect, useState } from "react";

import classNames from "classnames/bind";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Order.module.scss";
import currencyFormat from "@/utils/currencyFormat.js";
import { Button } from "@/components";
import message from "@/utils/message.js";
import { UpdateUserForm } from "@/forms";
import { useCreateOrder } from "@/react-query/orderQuery";
import { removeOrderProduct } from "@/redux/slice/orderSlice";
import handleDecoded from "@/utils/jwtDecode";
import { Breadcrumb } from "@/components";

const cx = classNames.bind(styles);
const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { orderItemsSelected } = useSelector((state) => state.order);

  const [isOpenUpdatePhone, setIsOpenUpdatePhone] = useState(false);
  const [isOpenUpdateAddress, setIsOpenUpdateAddress] = useState(false);
  const [isOpenFormConfirm, setOpenFormConfirm] = useState(false);

  const [typeDelivery, setTypeDelivery] = useState("slow");
  const [priceDelivery, setPriceDelivery] = useState(15000);
  const [payment, setPayment] = useState("later_money");

  const { mutateAsync: createOrder, isPending: loadingCreate } =
    useCreateOrder();

  const handleChangeDelivery = (event) => {
    if (event.target.value === "slow") {
      setPriceDelivery(15000);
    } else {
      setPriceDelivery(30000);
    }
    setTypeDelivery(event.target.value);
  };
  const handleChangePayment = (event) => {
    setPayment(event.target.value);
  };

  const { state } = useLocation();

  useEffect(() => {
    if (!state?.totalPrice && orderItemsSelected.length === 0) {
      navigate("/cart");
    }
  }, []);

  const orderOption = [
    {
      title: "Chọn phương thức giao hàng",
      value: typeDelivery,
      onChange: handleChangeDelivery,
      option: [
        {
          value: "fast",
          title: "Giao hàng nhanh",
        },
        {
          value: "slow",
          title: "Giao hàng tiết kiệm",
        },
      ],
    },
    {
      title: "Chọn phương thức thanh toán",
      value: payment,
      onChange: handleChangePayment,
      option: [
        {
          value: "later_money",
          title: "Thanh toán tiền mặt khi nhận hàng",
        },
      ],
    },
  ];

  const handleOpenForm = () => {
    setOpenFormConfirm(true);
  };

  const handleCloseForm = () => {
    setOpenFormConfirm(false);
  };

  const handleOrder = async () => {
    const { storageData } = handleDecoded();
    const newOrderItemsSelected = orderItemsSelected.map((item) => ({
      ...item,
      isRating: false,
    }));

    const res = await createOrder({
      token: storageData,
      detailOrder: {
        orderItems: newOrderItemsSelected,
        shippingAddress: {
          email: currentUser.email,
          address: currentUser.address,
          phone: currentUser.phone,
        },
        paymentMethod: payment,
        shippingMethod: typeDelivery,
        userId: currentUser._id,
        price: state?.totalPrice + priceDelivery,
      },
    });

    if (res?.status !== "200") {
      message("error", res?.message);
    } else {
      message("success", res?.message);
      handleCloseForm();
      orderItemsSelected.map((item) => {
        dispatch(removeOrderProduct({ idProduct: item._id }));
      });
      navigate("/my-orders");
    }
  };

  console.log("Loading", loadingCreate);

  return (
    <div className={cx("order")}>
      <Breadcrumb bgColor="white" />

      <div className={cx("order-wrapper")}>
        <div className="container">
          <div className={cx("order-title")}>Thanh toán</div>
          <div className={cx("order-row")}>
            <div className={cx("order-col")}>
              <div className={cx("order-list")}>
                {orderOption.map((item, index) => (
                  <div key={index} className={cx("order-item")}>
                    <div className={cx("order-item__title")}>{item.title}</div>

                    <div className={cx("order-item__content")}>
                      <FormControl>
                        <RadioGroup
                          name="controlled-radio-buttons-group"
                          value={item.value}
                          onChange={item.onChange}
                        >
                          {item.option.map((optionItem, index) => (
                            <FormControlLabel
                              key={index}
                              value={optionItem.value}
                              control={<Radio />}
                              label={optionItem.title}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={cx("order-col")}>
              <div className={cx("order-list")}>
                <div className={cx("order-item")}>
                  <div>
                    <span className={cx("order-label")}>Địa Chỉ:</span>
                    <span className={cx("order-info")}>
                      {currentUser.address}
                    </span>
                    <span
                      className={cx("order-change")}
                      onClick={() => setIsOpenUpdateAddress(true)}
                    >
                      Thay đổi
                    </span>
                  </div>
                  <div>
                    <span className={cx("order-label")}>Số điện thoại:</span>
                    <span className={cx("order-info")}>
                      {currentUser.phone}
                    </span>
                    <span
                      className={cx("order-change")}
                      onClick={() => setIsOpenUpdatePhone(true)}
                    >
                      Thay đổi
                    </span>
                  </div>
                </div>
                <div className={cx("order-item")}>
                  <div>
                    <span>Tạm tính:</span>
                    <span className={cx("order-price")}>
                      {currencyFormat(state?.totalPrice)}
                    </span>
                  </div>
                  <div>
                    <span>Phí giao hàng:</span>
                    <span className={cx("order-price")}>
                      {currencyFormat(priceDelivery)}
                    </span>
                  </div>
                </div>
                <div className={cx("order-item")}>
                  <div>
                    <span>Tổng tiền:</span>
                    <span>
                      <p className={cx("order__total-price")}>
                        {currencyFormat(state?.totalPrice + priceDelivery)}
                      </p>
                      <p className={cx("order__total-info")}>
                        (đã bao gồm VAT nếu có)
                      </p>
                    </span>
                  </div>
                </div>
              </div>

              <Button
                primary
                className={cx("order-button")}
                onClick={handleOpenForm}
              >
                Đặt hàng
              </Button>
            </div>
          </div>

          {isOpenUpdatePhone && (
            <UpdateUserForm
              userKey="phone"
              currentValue={currentUser.phone}
              idUser={currentUser._id}
              setOpenForm={setIsOpenUpdatePhone}
            />
          )}

          {isOpenUpdateAddress && (
            <UpdateUserForm
              userKey="address"
              currentValue={currentUser.address}
              idUser={currentUser._id}
              setOpenForm={setIsOpenUpdateAddress}
            />
          )}
        </div>
      </div>

      <Dialog
        open={isOpenFormConfirm}
        onClose={handleCloseForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận đặt hàng"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xác nhận thanh toán:{"  "}
            <span className={cx("confirm-price")}>
              {currencyFormat(state?.totalPrice + priceDelivery)}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className={cx("btn-back")} onClick={handleCloseForm}>
            Hủy
          </Button>
          <Button
            primary
            onClick={async () => await handleOrder()}
            autoFocus
            disable={loadingCreate ? true : false}
          >
            {loadingCreate ? "...Loading" : "Đồng ý"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Order.propTypes = {};

export default Order;
