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
    getMyOrders: (data) => {
        const { token, idUser } = data;
        return axiosAuthClient.get(`${resourceName}/get-order-user/${idUser}`, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    }

}

export default orderApi;