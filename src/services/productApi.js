import { axiosClient } from "@/utils/httpRequest";

const resourceName = '/product';

const productApi = {
    getProductByName: (search, limit) => {

        const params = {
            name: search,
            limit
        }
        return axiosClient.get(`${resourceName}/getProducts`, { params })
    },
    getAllProduct: () => {
        return axiosClient.get(`${resourceName}/getProducts`)
    },
    getProducts: (params) => {
        return axiosClient.get(`${resourceName}/getProducts`, { params })
    },
    getDetailProduct: (id) => {
        return axiosClient.get(`${resourceName}/get-detail/${id}`)
    },
    createProduct: (data) => {
        return axiosClient.post(`${resourceName}/create-product`, data)
    },
    updateProduct: (data) => {
        return axiosClient.put(`${resourceName}/update-product/${data.id}`, data)
    },
    deleteProduct: (id) => {
        return axiosClient.delete(`${resourceName}/delete-product/${id}`)
    },
    getAllType: () => {
        return axiosClient.get(`${resourceName}/getAllType`)
    },
};

export default productApi;