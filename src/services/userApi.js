import { axiosClient, axiosAuthClient } from "@/utils/httpRequest";

const resourceName = '/user';

const userApi = {
    createUser: (data) => {
        return axiosClient.post(`${resourceName}/sign-up`, data)
    },
    loginUser: (data) => {
        return axiosClient.post(`${resourceName}/sign-in`, data)
    },
    logoutUser: () => {
        return axiosClient.get(`${resourceName}/log-out`)
    },
    getDetailUser: (id, access_token) => {
        return axiosAuthClient.get(`${resourceName}/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        })
    },


    refreshToken: () => {
        return axiosClient.get(`${resourceName}/refresh-token`, {
            withCredentials: true
        })
    }
};

export default userApi;