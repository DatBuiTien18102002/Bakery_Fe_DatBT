import { createSlice } from '@reduxjs/toolkit'
import message from "@/utils/message.js"

const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    isSuccessOrder: false,
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?._id === orderItem._id)
            if (itemOrder) {
                if ((itemOrder.amount + orderItem?.amount) <= itemOrder.countInStock) {
                    itemOrder.amount += orderItem?.amount
                    // state.isSuccessOrder = true
                } else {
                    message("error", "Sản phẩm trong kho không đủ")
                    // state.isErrorOrder = false
                }
            } else {
                state.orderItems.push(orderItem)
            }
        },
        resetOrder: (state) => {
            // state.isSuccessOrder = false
        },
        increaseAmount: (state, action) => {
            // const { idProduct } = action.payload
            // const itemOrder = state?.orderItems?.find((item) => item?.productId === idProduct)
            // const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.productId === idProduct)
            // itemOrder.amount++;
            // if (itemOrderSelected) {
            //     itemOrderSelected.amount++;
            // }
        },
        decreaseAmount: (state, action) => {
            // const { idProduct } = action.payload
            // const itemOrder = state?.orderItems?.find((item) => item?.productId === idProduct)
            // const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.Id === idProduct)
            // itemOrder.amount--;
            // if (itemOrderSelected) {
            //     itemOrderSelected.amount--;
            // }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload

            const itemOrder = state?.orderItems?.filter((item) => item?._id !== idProduct)
            // const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.productId !== idProduct)

            state.orderItems = itemOrder;
            // state.orderItemsSelected = itemOrderSelected;
        },
        removeAllOrderProduct: (state, action) => {
            // const { listChecked } = action.payload

            // const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.productId))
            // const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.Id))
            // state.orderItems = itemOrders
            // state.orderItemsSelected = itemOrdersSelected

        },
        selectedOrder: (state, action) => {
            // const { listChecked } = action.payload
            // const orderSelected = []
            // state.orderItems.forEach((order) => {
            //     if (listChecked.includes(order.productId)) {
            //         orderSelected.push(order)
            //     }
            // });
            // state.orderItemsSelected = orderSelected
        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder } = orderSlice.actions

const orderReducer = orderSlice.reducer;
export default orderReducer