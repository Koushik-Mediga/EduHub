import { categoryEndPoints, courseEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setMyCourses } from "../../slices/mycoursesSlice";
import { setStep, setCourse, setEditCourse, setEditSections, setEditLecture } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { getUserDetails } from "./profileApi";


export const getMyCourses = async (token, dispatch, navigate)=>{
    try{
        const response = await apiConnector("GET", courseEndPoints.GET_MY_COURSES, null, {Authorization: `Bearer ${token}`}, null);
        const courses = response.data.courses;
        dispatch(setMyCourses(courses));
    }catch(e){
        console.log(e.response);
    }
}

export const getCourseDetails = async ({courseId, setCourseDetails})=>{
    try {
        const response = await apiConnector("GET", courseEndPoints.GET_COURSE_DETAILS, null, null, {courseId});
        setCourseDetails(response.data.courseDetails);
    } catch (e) {
        console.log(e.response);
        toast.error(e.response.message)
    }
}

export const getTopRatedCourses = async ({setTopRatedCourses})=>{
    try {
        const response = await apiConnector("GET", courseEndPoints.GET_TOP_RATED_COURSES, null, null, null);
        setTopRatedCourses(response.data.courses);

    } catch (e) {
        console.log(e.response);
        toast.error(e.response.message);
    }
}


export const getCategoryPageDetails = async ({ categoryId, setCategoryDetails }) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector(
            "GET",
            categoryEndPoints.GET_CATEEGORY_PAGE_DETAILS,
            null,              
            null,             
            { categoryId }      
        );

        setCategoryDetails(response?.data?.data);

        toast.dismiss(toastId);
    } catch (error) {
        toast.error("Something went wrong while fetching category data", { id: toastId });
        console.log(error?.response);
    }
};

export const createCourse = async (formData, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndPoints.CREATE_COURSE, formData, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        console.log(response.data.course);
        dispatch(setEditCourse(true));
        dispatch(setStep(2));
        toast.success("Course Created Successfully", {id:toastId});
    } catch (e) {
        toast.error("Something went wrong while creating a course", {id:toastId});
        console.log((e.response));
    }
}

export const updateCourse = async (formData, token, dispatch)=>{
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT", courseEndPoints.UPDATE_COURSE, formData, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        console.log(response.data.course);
        dispatch(setEditCourse(true));
        dispatch(setStep(2));
        toast.success("Course Updated successfully", {id:toastId});
    }catch(error){
        toast.error("Something went wrong while creating a course", {id:toastId});
        console.log(error.response);
    }
}

export const publishCourse = async ({courseId, token, dispatch})=>{
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PUT", courseEndPoints.UPDATE_COURSE, {publishStatus:"published", courseId}, {Authorization: `Bearer ${token}`}, null);
        toast.success("Course Published Successfully", {id:toastId});
    }catch(error){
        toast.error("Something went wrong while creating a course", {id:toastId});
        console.log(error.response);
    }
}

    export const deleteCourse = async ({courseId}, token, dispatch)=>{
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", courseEndPoints.DELETE_COURSE, {courseId}, {Authorization: `Bearer ${token}`}, null);
        getUserDetails(token, dispatch);
        toast.success("Course Deleted Successfully", {id:toastId})
    }catch(error){
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const createSection = async (formData, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndPoints.CREATE_SECTION, formData, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        console.log(response.data);
        toast.success("Section created successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const updateSection = async (formData, token, dispatch,navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", courseEndPoints.UPDATE_SECTION, formData, {Authorization: `Bearer ${token}`}, null);
        console.log(response.data);
        dispatch(setCourse(response.data.course));
        dispatch(setEditCourse(true));
        dispatch(setStep(2));
        dispatch(setEditSections(false));
        dispatch(setEditLecture(false));
        console.log(response.data);
        toast.success("Section Updated successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const createSubSection = async (formData, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", courseEndPoints.CREATE_SUB_SECTION, formData, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        toast.success("Lecture created successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const updateSubSection = async (formData, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", courseEndPoints.UPDATE_SUB_SECTION, formData, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        toast.success("Lecture Updated successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const deleteSubSection = async ({courseId, sectionId, subSectionId}, token, dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", courseEndPoints.DELETE_SUB_SECTION,{courseId, sectionId, subSectionId}, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        toast.success("Lecture Deleted successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}

export const deleteSection = async ({courseId, sectionId}, token, dispatch)=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("DELETE", courseEndPoints.DELETE_SECTION, {courseId, sectionId}, {Authorization: `Bearer ${token}`}, null);
        dispatch(setCourse(response.data.course));
        toast.success("Section Deleted successfully", {id:toastId});
    } catch (error) {
        toast.error(error.response.message, {id:toastId});
        console.log(error.response);
    }
}