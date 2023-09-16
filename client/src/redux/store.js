import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,

    },
    reducers: {
        login(state) {
            state.isLogin = true;

        },   //reducers are functions that mutate state. 	They accept a value and return a new value.  	So
        logout(state) {
            state.isLogin = false;

        }    //reducers are functions that mutate state. 	They accept a value and return a new value.  	So
    }
})
export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
});