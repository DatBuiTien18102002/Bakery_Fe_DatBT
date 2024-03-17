import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import images from "@/assets/images";
import currencyFormat from "@/utils/currencyFormat.js";
import getPriceDiscount from "@/utils/getPriceDiscount";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeOrderProduct } from "@/redux/slice/orderSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@/components";
import config from "@/config";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { selectedOrderItems } from "@/redux/slice/orderSlice";
import { useState } from "react";
import { updateAmount } from "../../redux/slice/orderSlice";
import message from "@/utils/message.js";
import { useNavigate } from "react-router-dom";
import { UserForm } from "@/forms";

const cx = classNames.bind(styles);
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderItemsSelected } = useSelector((state) => state.order);
  const currentUser = useSelector((state) => state.user);

  const { orderItems } = useSelector((state) => state.order);
  const [selected, setSelected] = useState(
    orderItemsSelected.map((item) => item._id)
  );
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);

  const newOrderItem = orderItems.map((item, index) => {
    index += 1;
    return {
      index,
      ...item,
    };
  });

  console.log("OrderItemSelected", orderItemsSelected);

  const totalPrice = orderItemsSelected.reduce((result, prod) => {
    let priceProduct = prod.price;
    if (prod.discount) {
      priceProduct = getPriceDiscount(prod.price, prod.discount);
    }

    return result + priceProduct * prod.amount;
  }, 0);

  const handleDelete = async (id) => {
    if (selected.includes(id)) {
      const newSelected = selected.filter((item) => item !== id);
      setSelected([...newSelected]);
    }
    dispatch(removeOrderProduct({ idProduct: id }));
  };

  const handleSelected = (productSelect) => {
    setSelected(productSelect);
    dispatch(selectedOrderItems({ listChecked: productSelect }));
  };

  const handleChangeAmount = (idProduct, amountUpdate) => {
    dispatch(updateAmount({ idProduct, amountUpdate }));
  };

  const handleOrder = () => {
    if (selected.length === 0) {
      message("error", "Bạn vẫn chưa chọn sản phẩm nào để mua");
      return;
    }

    if (!currentUser.address || !currentUser.phone) {
      setIsOpenEditForm(true);

      message(
        "error",
        "Cần cập nhật đầy đủ địa chỉ và số điện thoại trước khi thanh toán"
      );
      return;
    }
    navigate("/Order", { state: { totalPrice } });
  };

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 40,
    },
    {
      field: "image",
      headerName: "Ảnh sản phẩm",
      width: 130,

      renderCell: (params) => {
        return (
          <img
            className={cx("product-avatar")}
            src={
              params.row?.image ? params.row?.image : images.productImgDefault
            }
          />
        );
      },
      sortable: false,
      filterable: false,
    },

    { field: "name", headerName: "Tên sản phẩm", width: 170 },
    {
      field: "price",
      headerName: "Đơn giá",
      width: 100,
      renderCell: (params) => {
        let priceProduct = params.row?.price;
        if (params.row?.discount) {
          priceProduct = getPriceDiscount(
            params.row?.price,
            params.row?.discount
          );
        }

        return currencyFormat(priceProduct);
      },
    },
    {
      field: "amount",
      headerName: "Số lượng",
      type: "number",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={cx("product-detail__quantity")}>
            <div
              className={cx("product-detail__control", "control-minus", {
                disabled: params.row?.amount === 1,
              })}
              onClick={() => {
                if (params.row?.amount > 1) {
                  handleChangeAmount(params.row?._id, params.row?.amount - 1);
                }
              }}
            >
              -
            </div>
            <input
              className={cx("product-detail__num")}
              type="number"
              value={params.row?.amount}
              onChange={(e) => {
                let amountProduct = e.target.value;

                if (e.target.value > params.row?.countInStock) {
                  amountProduct = params.row?.countInStock;
                }
                handleChangeAmount(params.row?._id, amountProduct);
              }}
            />
            <div
              className={cx("product-detail__control", "control-plus", {
                disabled: params.row?.amount === params.row?.countInStock,
              })}
              onClick={() => {
                if (params.row?.amount < params.row?.countInStock) {
                  handleChangeAmount(params.row?._id, params.row?.amount + 1);
                }
              }}
            >
              +
            </div>
          </div>
        );
      },
    },
    {
      field: "intoPrice",
      headerName: "Thành tiền",
      type: "number",
      width: 170,
      renderCell: (params) => {
        let priceProduct = params.row?.price;
        if (params.row?.discount) {
          priceProduct = getPriceDiscount(
            params.row?.price,
            params.row?.discount
          );
        }

        return currencyFormat(priceProduct * params.row?.amount);
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      width: 80,
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={() => handleDelete(params.id)}
            className={cx("cart-icon")}
            disable="true"
          />
        );
      },
    },
  ];

  return (
    <div className={cx("cart")}>
      <div className="container">
        <div className={cx("cart-title")}>Giỏ hàng</div>

        <div className={cx("table-wrapper")}>
          <DataGrid
            rows={newOrderItem}
            columns={columns}
            pageSizeOptions={[]}
            getRowId={(row) => row._id}
            rowHeight={70}
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
              ".css-1e7c2qr-MuiToolbar-root-MuiTablePagination-toolbar": {
                display: "none",
              },
            }}
            checkboxSelection
            rowSelectionModel={selected}
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelected}
          />
        </div>

        <div className={cx("cart-option")}>
          <div>
            <Button
              className={cx("cart-back")}
              to={config.routes.product}
              leftIcon={
                <KeyboardArrowLeftIcon
                  style={{ display: "flex", alignItems: "center" }}
                />
              }
              primary
            >
              Tiếp tục mua hàng
            </Button>
          </div>

          <div>
            <div className={cx("cart-total__wrapper")}>
              <div className={cx("cart-total__label")}>Tổng tiền hàng</div>
              <div className={cx("cart-total__price")}>
                {currencyFormat(totalPrice)}
              </div>
            </div>

            <Button
              primary
              className={cx("cart-checkout")}
              onClick={handleOrder}
            >
              Tiến hành thanh toán
            </Button>
          </div>
        </div>
      </div>

      {isOpenEditForm && (
        <UserForm
          action="Edit"
          setOpenEdit={setIsOpenEditForm}
          userEdit={currentUser}
        />
      )}
    </div>
  );
};

export default Cart;
