import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 1,
    course: null,
    editCourse: false,
    editSections: false,
    editLecture:false,
}


const courseSlice = createSlice({
    name: "course",
    initialState: initialState,
    reducers: {
        setStep(state, actions){
            state.step = actions.payload;
        },
        setCourse(state, actions){
            state.course = actions.payload;
        },
        setEditCourse(state, actions){
            state.editCourse = actions.payload;
        },
        setEditSections(state, actions){
            state.editSections = actions.payload;
        },
        setEditLecture(state, actions){
            state.editLecture = actions.payload;
        }
    },
});

export const {setStep, setCourse, setEditCourse, setEditSections,setEditLecture} = courseSlice.actions;
export default courseSlice.reducer;