import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { userKeys } from "./queryKeys"
import userApi from "../services/userApi"
import handleDecoded from "@/utils/jwtDecode";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => userApi.createUser(data),
        onSuccess: () => {
            const { storageData } = handleDecoded();
            queryClient.invalidateQueries({
                queryKey: [userKeys.GET_ALL_USER, storageData]
            })
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return userApi.updateUser(data)
        },
        onSuccess: () => {
            const { storageData } = handleDecoded();
            queryClient.invalidateQueries({
                queryKey: [userKeys.GET_ALL_USER, storageData]
            })
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return userApi.deleteUser(data)
        },
        onSuccess: () => {
            const { storageData } = handleDecoded();
            queryClient.invalidateQueries({
                queryKey: [userKeys.GET_ALL_USER, storageData]
            })
        }
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

export const useGetAllUser = () => {
    const { storageData } = handleDecoded();
    return useQuery({
        queryKey: [userKeys.GET_ALL_USER, storageData],
        queryFn: () => {
            return userApi.getAllUser(storageData)
        },
        enabled: !!storageData,
    });
}



