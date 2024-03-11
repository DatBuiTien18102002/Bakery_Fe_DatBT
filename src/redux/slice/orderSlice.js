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
        updateAmount: (state, action) => {
            const { idProduct, amountUpdate } = action.payload;
            const orderUpdate = state.orderItems.find((item) => item._id === idProduct);
            const orderSelectedUpdate = state.orderItemsSelected.find((item) => item._id === idProduct);

            if (orderUpdate.amount) {
                orderUpdate.amount = amountUpdate;
            }
            if (orderSelectedUpdate?.amount) {
                orderSelectedUpdate.amount = amountUpdate;
            }
        },
        resetOrder: (state) => {
            // state.isSuccessOrder = false
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            const orderItemsSelected = state.orderItems.filter((orderItem) => listChecked.includes(orderItem._id));

            state.orderItemsSelected = orderItemsSelected
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload

            const itemOrder = state?.orderItems?.filter((item) => item?._id !== idProduct)
            state.orderItems = itemOrder;

            const orderItemsSelected = state?.orderItemsSelected?.find((item) => item?._id === idProduct)
            if (orderItemsSelected?._id) {
                const newOrderItemsSelected = state?.orderItemsSelected?.filter((item) => item?._id !== idProduct);
                state.orderItemsSelected = newOrderItemsSelected;
            }

        },
        removeAllOrderProduct: (state, action) => {
            // const { listChecked } = action.payload

            // const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.productId))
            // const itemOrdersSelected = state?.orderItems?.filter((item) => !listChecked.includes(item.Id))
            // state.orderItems = itemOrders
            // state.orderItemsSelected = itemOrdersSelected

        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder, updateAmount } = orderSlice.actions

const orderReducer = orderSlice.reducer;
export default orderReducer