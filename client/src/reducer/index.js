import {combineReducers} from "@reduxjs/toolkit"

import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import myCoursesReducer from '../slices/mycoursesSlice'
import courseReducer from '../slices/courseSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    myCourses:myCoursesReducer,
    course: courseReducer,
})

export default rootReducer