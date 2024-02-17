import { axiosClient } from "@/utils/httpRequest";

const resourceName = '/product';

const productApi = {
    getProductByName: (search, limit) => {

        const params = {
            name: search,
            limit
        }
        return axiosClient.get(`${resourceName}/getProducts`, { params })
    }
};

export default productApi;