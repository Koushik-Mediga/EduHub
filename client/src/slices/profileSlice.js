import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user: (localStorage.getItem("user")?JSON.parse((localStorage.getItem("user"))):null),
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, actions){
            state.user = actions.payload;
        },
    },
});

export const {setUser} = profileSlice.actions;
export default profileSlice.reducer;