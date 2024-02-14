import { axiosClient } from "@/utils/httpRequest";

const resourceName = '/user';

const userApi = {
    refreshToken: () => {
        return axiosClient.get(`${resourceName}/refresh-token`, {
            withCredentials: true
        })
    }
};

export default userApi;