import axios from "axios";
import queryString from 'query-string';
import handleDecoded from "./jwtDecode";

import userApi from "@/services/userApi";
import message from "@/utils/message";

const handleCreateAxios = () => {
    return axios.create({
        baseURL: import.meta.env.VITE_REACT_API_URL,
        headers: {
            'content-type': 'application/json',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    });
}

const axiosClient = handleCreateAxios();

////////////////////////////////////////

const axiosAuthClient = handleCreateAxios();

axiosAuthClient.interceptors.request.use(
    async function (config) {
        // Do something before request is sent

        let storageRefreshToken = localStorage.getItem("refresh_token");
        const refreshToken = JSON.parse(storageRefreshToken);

        const currentTime = new Date();
        const { decoded } = handleDecoded();
        if (decoded?.exp < currentTime.getTime() / 1000) {
            try {
                // const data = await userApi.refreshToken();
                const data = await userApi.refreshToken(refreshToken);
                console.log("refresh", data);
                //Check nếu refresh token hết hạn thì chuyển sang trang đăng nhập
                if (data?.err === "jwt expired") {
                    throw new Error("Refresh Token hết hạn");
                }
                localStorage.setItem(
                    "access_token",
                    JSON.stringify(data?.newAccess_Token)
                );
                config.headers["token"] = `Bearer ${data?.newAccess_Token}`;
            } catch (error) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                message("error", "Refresh Token hết hạn");
                message("info", "Bạn cần đăng nhập lại");
                setTimeout(() => window.location.href = "/", 3000)
            }
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);


const axiosList = [
    axiosClient,
    axiosAuthClient,
]

axiosList.forEach((axiosItem) => {
    axiosItem.interceptors.response.use(
        (response) => {
            if (response && response.data) {
                return response.data;
            }
            return response;
        },
        (error) => {
            // Handle errors
            throw error;
        },
    );
})

export { axiosClient, axiosAuthClient }
