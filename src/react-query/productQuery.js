import { useQuery } from "@tanstack/react-query"
import { productKeys } from "./queryKeys"
import productApi from "@/services/productApi"


export const useGetProductByName = ({ search, limit = 0 }) => {
    return useQuery({
        queryKey: [productKeys.GET_PRODUCT_BY_NAME, search],
        queryFn: () => productApi.getProductByName(search, limit),
        placeholderData: (previousData) => previousData,
    })
}