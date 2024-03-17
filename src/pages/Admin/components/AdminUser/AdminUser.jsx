import classNames from "classnames/bind";
import styles from "./AdminUser.module.scss";

import AddIcon from "@mui/icons-material/Add";
import images from "@/assets/images";
import { useGetAllUser } from "@/react-query/userQuery";
import { DataGrid } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "@/forms/UserForm/UserForm";
import { useEffect, useState } from "react";
import handleDecoded from "@/utils/jwtDecode";
import { useDeleteUser, useGetDetailUser } from "@/react-query/userQuery";
import message from "@/utils/message.js";

const cx = classNames.bind(styles);
const AdminUser = () => {
  const { data: AllUser, isLoading } = useGetAllUser();
  const { storageData } = handleDecoded();

  const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [userIdEdit, setUserIdEdit] = useState("");
  const [userEdit, setUserEdit] = useState("");
  const [hasDeleteUser, setHasDeleteUser] = useState(true);

  const { data: userDetail } = useGetDetailUser({
    id: userIdEdit,
    token: storageData,
  });

  useEffect(() => {
    //prevent delete before update list allUser
    setHasDeleteUser(true);
  }, [AllUser]);

  const { mutateAsync: deleteUser, isPending: isLoadingDelete } =
    useDeleteUser();

  useEffect(() => {
    if (userDetail && userIdEdit) {
      setIsOpenEditForm(true);
      setUserEdit(userDetail);
    }
  }, [userDetail]);

  const handleEdit = (id) => {
    if (userIdEdit === id) {
      setIsOpenEditForm(true);
    } else {
      setUserIdEdit(id);
    }
  };

  const handleDelete = async (id) => {
    if (!isLoadingDelete && hasDeleteUser) {
      const res = await deleteUser({ id, token: storageData });
      if (res.status !== "200") {
        message("error", res?.message);
      } else {
        message("success", res?.message);
        setHasDeleteUser(false);
        setUserIdEdit("");
      }
    }
  };

  const newAllUsers = AllUser?.data.map((item, index) => {
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
      field: "avatar",
      headerName: "Avatar",
      width: 80,

      renderCell: (params) => {
        return (
          <img
            className={cx("user-avatar")}
            src={params.row?.avatar ? params.row?.avatar : images.avatarDefault}
          />
        );
      },
      sortable: false,
      filterable: false,
    },

    { field: "name", headerName: "Name", width: 110 },
    { field: "email", headerName: "Email", width: 230 },
    {
      field: "phone",
      headerName: "Phone",
      sortable: false,
      width: 110,
    },
    {
      field: "address",
      headerName: "Address",
      sortable: false,
      type: "number",
      width: 330,
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
            className={cx("user-icon")}
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
            className={cx("user-icon", { disable: isLoadingDelete })}
            disable="true"
          />
        );
      },
    },
  ];

  return (
    <>
      <button
        className={cx("add-user")}
        onClick={() => setIsOpenCreateForm(true)}
      >
        <AddIcon style={{ fontSize: 60 }} />
      </button>

      <div className={cx("table-wrapper")}>
        <DataGrid
          rows={newAllUsers ? newAllUsers : []}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          getRowId={(row) => row._id}
          rowHeight={70}
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          // checkboxSelection
          // onRowSelectionModelChange={handleSelectionModelChange}
        />
      </div>

      {isOpenCreateForm && (
        <UserForm
          action="Create"
          setOpenCreate={setIsOpenCreateForm}
          setOpenEdit={setIsOpenEditForm}
        />
      )}
      {isOpenEditForm && (
        <UserForm
          action="Edit"
          setOpenCreate={setIsOpenCreateForm}
          setOpenEdit={setIsOpenEditForm}
          setUserIdEdit={setUserIdEdit}
          userEdit={userEdit?.data}
        />
      )}
    </>
  );
};

export default AdminUser;
