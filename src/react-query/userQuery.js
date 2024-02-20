import { useMutation, useQuery } from "@tanstack/react-query"

import { userKeys } from "./queryKeys"
import userApi from "../services/userApi"

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (data) => userApi.createUser(data)
    })
}

export const useLoginUser = () => {
    return useMutation({
        mutationFn: (data) => userApi.loginUser(data)
    })
}

export const useLogout = () => {
    return useMutation({
        mutationFn: () => userApi.logoutUser()
    })
}

export const useGetDetailUser = (data) => {
    return useQuery({
        queryKey: [userKeys.GET_USER_DETAIL, data],
        queryFn: () => {
            return userApi.getDetailUser(data.id, data.token)
        },
        enabled: !!data?.id && !!data?.token,
    });
}



