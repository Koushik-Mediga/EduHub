import { courseEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setMyCourses } from "../../slices/mycoursesSlice";

export const getMyCourses = async (token, dispatch, navigate)=>{
    try{
        const response = await apiConnector("GET", courseEndPoints.GET_MY_COURSES, null, {Authorization: `Bearer ${token}`}, null);
        const courses = response.data.courses;
        dispatch(setMyCourses(courses));
    }catch(e){
        console.log(e.response);
    }
}