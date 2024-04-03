import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import handleDecoded from "@/utils/jwtDecode";
import { orderKeys } from "./queryKeys"
import orderApi from "@/services/orderApi"


export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (data) => orderApi.createOrder(data)
    })
}

export const useGetMyOrders = (data) => {
    return useQuery({
        queryKey: [orderKeys.GET_MY_ORDERS, data],
        queryFn: () => orderApi.getMyOrders(data)
    })
}

export const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    const { storageData } = handleDecoded();
    return useMutation({
        mutationFn: (data) => {
            return orderApi.updateOrder({ ...data, token: storageData });
        },
        onSuccess: () => {
            const { decoded, storageData } = handleDecoded();
            queryClient.invalidateQueries({
                queryKey: [orderKeys.GET_ALL_ORDER, storageData]
            })
            queryClient.invalidateQueries({
                queryKey: [orderKeys.GET_MY_ORDERS, {
                    token: storageData,
                    idUser: decoded?.payload?.id,
                }]
            })
        }
    })
}

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => orderApi.deleteOrder(data),
        onSuccess: () => {
            const { decoded, storageData } = handleDecoded();
            queryClient.invalidateQueries({
                queryKey: [orderKeys.GET_MY_ORDERS, {
                    token: storageData,
                    idUser: decoded?.payload?.id,
                }]
            });
        }
    })
}

export const useGetAllOrder = (token) => {
    return useQuery({
        queryKey: [orderKeys.GET_ALL_ORDER, token],
        queryFn: () => orderApi.getAllOrder(token)
    })
}