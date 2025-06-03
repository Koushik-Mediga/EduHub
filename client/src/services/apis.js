const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "course/showallcategories"
}

export const authEndpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API: BASE_URL + "auth/signup",
    SENDOTP_API: BASE_URL + "auth/sendotp",
    CHANGEPASSWORD_API: BASE_URL + "auth/changepassword"
}

export const profileEndPoints = {
    GETUSERDETAILS: BASE_URL + "profile/getuserdetails",
    DELETE_ACCOUNT: BASE_URL + "profile/deleteaccount",
    UPDATE_PROFILE: BASE_URL + "profile/updateprofile",
    UPDATE_PROFILE_PICTURE: BASE_URL + "profile/updatedisplaypicture"
}

export const courseEndPoints = {
    CREATE_COURSE: BASE_URL + "course/createcourse",
    GET_MY_COURSES: BASE_URL + "course/getmycourses",
    SHOW_ALL_COURSES: BASE_URL + "course/showallcourses",
    GET_COURSE_DETAILS: BASE_URL +  "course/getcoursedetails",

    CREATE_SECTION: BASE_URL + "course/createsection",
    UPDATE_SECTION: BASE_URL + "course/updatesection",
    DELETE_SECTION: BASE_URL + "course/deletesection",

    CREATE_SUB_SECTION: BASE_URL + "course/createsubsection",
    UPDATE_SUB_SECTION: BASE_URL + "course/updatesubsection",
    DELETE_SUB_SECTION: BASE_URL + "course/deletesubsection",

}