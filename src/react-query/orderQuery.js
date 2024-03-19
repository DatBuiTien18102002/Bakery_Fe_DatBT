import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "@/services/orderApi"
import { orderKeys } from "./queryKeys"

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (data) => orderApi.createOrder(data)
    })
}

export const useGetMyOrders = (data) => {
    return useQuery({
        queryKey: [orderKeys.GET_MY_ORDERS],
        queryFn: () => orderApi.getMyOrders(data)
    })
}