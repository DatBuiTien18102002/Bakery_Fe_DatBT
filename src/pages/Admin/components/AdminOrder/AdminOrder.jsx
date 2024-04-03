import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

import styles from "./AdminOrder.module.scss";
import handleDecoded from "@/utils/jwtDecode";
import { useGetAllOrder, useUpdateOrder } from "@/react-query/orderQuery";
import currencyFormat from "@/utils/currencyFormat.js";
import Button from "@/components/Button/Button";

const cx = classNames.bind(styles);
const AdminOrder = () => {
  const { storageData } = handleDecoded();
  const { data: allOrder } = useGetAllOrder(storageData);
  const { mutateAsync: updateOrder } = useUpdateOrder();

  const newAllOrder = allOrder?.data.map((item, index) => {
    index += 1;
    return {
      index,
      ...item,
    };
  });

  const handleUpdateStatus = async (id) => {
    await updateOrder({
      id: id,
      infoUpdate: {
        status: "confirm_order",
        deliveredAt: new Date(),
      },
    });
  };

  const renderStatus = (status, id) => {
    switch (status) {
      case "waiting_confirm":
        return (
          <Button primary onClick={async () => await handleUpdateStatus(id)}>
            Confirm order
          </Button>
        );
      case "confirm_order":
        return "Đang giao hàng";
      case "evaluate_product":
      case "order_success":
        return "Thành công";
      default:
        return <></>;
    }
  };

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 40,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return renderStatus(params.row.status, params.row?._id);
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      renderCell: (params) => {
        return params.row?.shippingAddress.email;
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
      renderCell: (params) => {
        return params.row?.shippingAddress.phone;
      },
    },
    {
      field: "price",
      headerName: "Total price",
      width: 100,
      renderCell: (params) => {
        return currencyFormat(params.row?.price);
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 270,
      renderCell: (params) => {
        return params.row?.shippingAddress.address;
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment method",
      width: 170,
      renderCell: (params) => {
        if (params.row?.paymentMethod === "later_money") {
          return "Thanh toán tiền mặt";
        } else {
          return "Thanh toán bằng thẻ tín dụng";
        }
      },
    },
    {
      field: "shippingMethod",
      headerName: "Shipping method",
      width: 170,
      renderCell: (params) => {
        if (params.row?.shippingMethod === "slow") {
          return "Giao hàng tiết kiệm";
        } else {
          return "Giao hàng nhanh";
        }
      },
    },
    {
      field: "createdAt",
      headerName: "Time order",
      width: 170,
      renderCell: (params) => {
        const formattedDateOrder = format(
          new Date(params.row?.createdAt),
          "HH:mm:ss dd/MM/yyyy "
        );

        return formattedDateOrder;
      },
    },
  ];

  return (
    <>
      <div className={cx("admin-order__title")}>Danh sách đơn hàng</div>

      <div className={cx("table-wrapper")}>
        <DataGrid
          rows={newAllOrder ? newAllOrder : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          getRowId={(row) => row._id}
          rowHeight={70}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
        />
      </div>
    </>
  );
};

export default AdminOrder;
