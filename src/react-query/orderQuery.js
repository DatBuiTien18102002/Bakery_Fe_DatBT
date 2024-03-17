import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import orderApi from "../services/orderApi"

export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (data) => orderApi.createOrder(data)
    })
}