import axios from "axios";
import queryString from 'query-string';
import handleDecoded from "./jwtDecode";
import { Navigate } from "react-router-dom";

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
        const currentTime = new Date();
        const { decoded } = handleDecoded();
        if (decoded?.exp < currentTime.getTime() / 1000) {
            try {
                const data = await userApi.refreshToken();
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
                message("error", "Refresh Token hết hạn");
                message("info", "Bạn cần đăng nhập lại");
                // window.location.href = "/sign-in";
                Navigate("/");
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
