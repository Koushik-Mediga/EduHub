import {createSlice} from "@reduxjs/toolkit"
import {toast} from 'react-hot-toast'


const initialState = {
    courses: localStorage.getItem("myCourses")? JSON.parse(localStorage.getItem("myCourses")):[]
};

const mycoursesSlice = createSlice({
    name: "myCourses",
    initialState: initialState,
    reducers: {
        setMyCourses(state, actions){
            state.courses = actions.payload;
        },
    },
});

export const {setMyCourses} = mycoursesSlice.actions;
export default mycoursesSlice.reducer;