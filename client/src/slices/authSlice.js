import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, actions){
            state.token = actions.payload;
        },
    },
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;