import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

}
const darkFromStorage = localStorage.getItem('darkMode')

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredential: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))

        },
        logout: (state, action) => {
            state.userInfo = null;
            const mode = JSON.parse(localStorage.getItem('darkMode'))
            localStorage.clear();
            localStorage.setItem('darkMode', mode)

        }
    }
})

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;