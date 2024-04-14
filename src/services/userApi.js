import { axiosClient, axiosAuthClient } from "@/utils/httpRequest";

const resourceName = '/user';

const userApi = {
    createUser: (data) => {
        return axiosClient.post(`${resourceName}/sign-up`, data)
    },
    updateUser: (data) => {
        const { token, id, ...detailUser } = data;

        return axiosAuthClient.put(`${resourceName}/update-user/${id}`, detailUser, {
            headers: {
                token: `Bearer ${token}`
            }
        })
    },
    deleteUser: (data) => {
        return axiosAuthClient.delete(`${resourceName}/delete-user/${data.id}`, {
            headers: {
                token: `Bearer ${data.token}`
            }
        })
    },
    loginUser: (data) => {
        return axiosClient.post(`${resourceName}/sign-in`, data)
    },
    loginBySocialMedia: () => {
        return axiosClient.get(`${resourceName}/social-auth`)
    },
    logoutUser: () => {
        return axiosClient.get(`${resourceName}/log-out`)
    },
    logoutSocialMedia: () => {
        return axiosClient.get(`${resourceName}/social-out`);
    },
    getDetailUser: (id, access_token) => {
        return axiosAuthClient.get(`${resourceName}/get-details/${id}`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        })
    },
    getAllUser: (access_token) => {

        return axiosAuthClient.get(`${resourceName}/getAll`, {
            headers: {
                token: `Bearer ${access_token}`
            }
        })
    },

    //refreshToken with cookie
    // refreshToken: () => {
    //     return axiosClient.get(`${resourceName}/refresh-token`, {
    //         withCredentials: true
    //     })
    // }

    //refreshToken with localStorage
    refreshToken: (refreshToken) => {
        return axiosClient.get(`${resourceName}/refresh-token`, {
            headers: {
                token: `Bearer ${refreshToken}`
            }
        })
    }
};

export default userApi;