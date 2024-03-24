import { axiosClient, axiosAuthClient } from "@/utils/httpRequest";

const resourceName = '/order';

const orderApi = {
    createOrder: (data) => {
        const { token, detailOrder } = data;
        return axiosAuthClient.post(`${resourceName}/create`, detailOrder, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    },
    updateOrder: (data) => {
        const { id, token, infoUpdate } = data;
        console.log("id", id);
        console.log("token", token);
        console.log("infoUpdate", infoUpdate);
        return axiosAuthClient.put(`${resourceName}/update-order/${id}`, infoUpdate, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    },
    deleteOrder: (data) => {
        const { token, orderId, orderItems } = data;
        return axiosAuthClient.delete(`${resourceName}/cancel-order/${orderId}`, {
            headers: {
                token: `Bearer ${token}`
            },
            data: {
                orderItems
            }
        })
    },
    getMyOrders: (data) => {
        const { token, idUser } = data;
        return axiosAuthClient.get(`${resourceName}/get-order-user/${idUser}`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    },

    getAllOrder: (token) => {
        return axiosAuthClient.get(`${resourceName}/get-all-order`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    }

}

export default orderApi;