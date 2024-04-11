import { axiosAuthClient } from "@/utils/httpRequest";

const resourceName = '/order';

const orderApi = {
    createOrder: (data) => {
        const { token, detailOrder } = data;
        return axiosAuthClient.post(`${resourceName}/create/${detailOrder.userId}`, detailOrder, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    },
    updateOrder: (data) => {
        const { id, token, infoUpdate, userId } = data;
        return axiosAuthClient.put(`${resourceName}/update-order/${id}`, { userId, infoUpdate }, {
            headers: {
                token: `Bearer ${token}`
            },
        })
    },
    deleteOrder: (data) => {
        const { token, orderId, orderItems, userId } = data;
        return axiosAuthClient.delete(`${resourceName}/cancel-order/${orderId}`, {
            headers: {
                token: `Bearer ${token}`
            },
            data: {
                orderItems,
                userId
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