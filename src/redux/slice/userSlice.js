import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
    access_token: '',
    isAdmin: false,
    _id: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name, email, access_token, address, phone, avatar, _id, isAdmin } = action.payload
            state.name = name ? name : '';
            state.email = email ? email : '';
            state.address = address ? address : '';
            state.phone = phone ? phone : '';
            state.avatar = avatar ? avatar : '';
            state._id = _id ? _id : '';
            state.access_token = access_token ? access_token : '';
            state.isAdmin = isAdmin ? isAdmin : false;

        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state._id = '';
            state.access_token = '';
            state.isAdmin = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions
const userReducer = userSlice.reducer;
export default userReducer