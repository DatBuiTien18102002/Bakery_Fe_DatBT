import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productKeys } from "./queryKeys"
import productApi from "@/services/productApi"


export const useGetProductByName = ({ search, limit = 0 }) => {
    return useQuery({
        queryKey: [productKeys.GET_PRODUCT_BY_NAME, search],
        queryFn: () => productApi.getProductByName(search, limit),
        placeholderData: (previousData) => previousData,
    })
}

export const useGetAllProduct = () => {
    return useQuery({
        queryKey: [productKeys.GET_All_PRODUCT],
        queryFn: () => productApi.getAllProduct()
    })
}

export const useGetDetailProduct = (id) => {
    return useQuery({
        queryKey: [productKeys.GET_DETAIL_PRODUCT, id],
        queryFn: () => productApi.getDetailProduct(id),
        enabled: !!id,
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return productApi.createProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_All_PRODUCT]
            });
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_ALL_TYPE],
            });
        }

    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => {
            return productApi.updateProduct(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_All_PRODUCT]
            });
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_ALL_TYPE],
            });
        }

    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => {
            return productApi.deleteProduct(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_All_PRODUCT]
            })
            queryClient.invalidateQueries({
                queryKey: [productKeys.GET_ALL_TYPE],
            });
        }
    })
}

export const useGetAllType = () => {
    return useQuery({
        queryKey: [productKeys.GET_ALL_TYPE],
        queryFn: () => productApi.getAllType()
    })
}