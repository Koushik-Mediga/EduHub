import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):null,
    authLoading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, actions){
            state.token = actions.payload;
        },
        setAuthLoading(state, actions){
            state.authLoading = actions.payload;
        }
    },
});

export const {setToken, setAuthLoading} = authSlice.actions;
export default authSlice.reducer;