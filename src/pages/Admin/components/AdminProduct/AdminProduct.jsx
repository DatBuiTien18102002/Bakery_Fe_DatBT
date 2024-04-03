import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";

import styles from "./AdminProduct.module.scss";
import images from "@/assets/images";
import { ProductForm } from "@/forms";
import message from "@/utils/message.js";
import {
  useGetAllProduct,
  useGetDetailProduct,
  useDeleteProduct,
  useGetAllType,
} from "@/react-query/productQuery";
import currencyFormat from "@/utils/currencyFormat.js";

const cx = classNames.bind(styles);
const AdminProduct = () => {
  const { data: allProduct, isLoading: loadingProducts } = useGetAllProduct();

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [productIdEdit, setProductIdEdit] = useState("");
  const [productEdit, setProductEdit] = useState("");
  const [hasDeleteProduct, setHasDeleteProduct] = useState(true);

  const { data: productDetail } = useGetDetailProduct(productIdEdit);
  const { data: typeList } = useGetAllType();

  useEffect(() => {
    //prevent delete before update list allUser
    setHasDeleteProduct(true);
  }, [allProduct]);

  const { mutateAsync: deleteProduct, isPending: isLoadingDelete } =
    useDeleteProduct();

  useEffect(() => {
    if (productDetail && productIdEdit) {
      setIsOpenEditForm(true);
      setProductEdit(productDetail);
    }
  }, [productDetail]);

  const handleEdit = (id) => {
    if (productIdEdit === id) {
      setIsOpenEditForm(true);
    } else {
      setProductIdEdit(id);
    }
  };

  const handleDelete = async (id) => {
    if (!isLoadingDelete && hasDeleteProduct) {
      const res = await deleteProduct(id);
      if (res.status !== "200") {
        message("error", res?.message);
      } else {
        message("success", res?.message);
        setHasDeleteProduct(false);
        setProductIdEdit("");
      }
    }
  };

  const newAllProduct = allProduct?.data.map((item, index) => {
    index += 1;
    return {
      index,
      ...item,
    };
  });

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 40,
    },
    {
      field: "image",
      headerName: "Image",
      width: 80,

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

    { field: "name", headerName: "Name", width: 170 },
    { field: "type", headerName: "Type", width: 100 },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        return currencyFormat(params.row?.price);
      },
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 70,
      renderCell: (params) => {
        return `${params.row?.discount ? params.row?.discount : 0} %`;
      },
    },
    {
      field: "countInStock",
      headerName: "In Stock",
      type: "number",
      width: 100,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 90,
    },
    {
      field: "sell",
      headerName: "Sold",
      type: "number",
      width: 70,
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      filterable: false,
      width: 40,
      renderCell: (params) => {
        return (
          <EditIcon
            onClick={() => handleEdit(params.id)}
            className={cx("product-icon")}
          />
        );
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
            onClick={async () => await handleDelete(params.id)}
            className={cx("product-icon", { disable: isLoadingDelete })}
            disable="true"
          />
        );
      },
    },
  ];

  return (
    <>
      <button
        className={cx("add-product")}
        onClick={() => setIsOpenCreateForm(true)}
      >
        <AddIcon style={{ fontSize: 60 }} />
      </button>

      <div className={cx("table-wrapper")}>
        <DataGrid
          rows={newAllProduct ? newAllProduct : []}
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

      {isOpenCreateForm && (
        <ProductForm
          action="Create"
          setOpenCreate={setIsOpenCreateForm}
          setOpenEdit={setIsOpenEditForm}
          typeList={typeList?.allType}
        />
      )}
      {isOpenEditForm && (
        <ProductForm
          action="Edit"
          setOpenCreate={setIsOpenCreateForm}
          setOpenEdit={setIsOpenEditForm}
          setProductIdEdit={setProductIdEdit}
          productEdit={productEdit}
          typeList={typeList?.allType}
        />
      )}
    </>
  );
};

export default AdminProduct;
