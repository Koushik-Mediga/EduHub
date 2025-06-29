const BASE_URL = process.env.REACT_APP_BASE_URL

export const categoryEndPoints = {
    CATEGORIES_API: BASE_URL + "course/showallcategories",
    GET_CATEEGORY_PAGE_DETAILS: BASE_URL + "course/getcategorypagedetails"
}

export const authEndpoints = {
    LOGIN_API: BASE_URL + "auth/login",
    SIGNUP_API: BASE_URL + "auth/signup",
    SENDOTP_API: BASE_URL + "auth/sendotp",
    CHANGEPASSWORD_API: BASE_URL + "auth/changepassword",
    RESET_PASSWORD_TOKEN: BASE_URL + "auth/resetpasswordtoken",
    RESET_PASSWORD: BASE_URL + "auth/resetpassword",
}

export const profileEndPoints = {
    GETUSERDETAILS: BASE_URL + "profile/getuserdetails",
    DELETE_ACCOUNT: BASE_URL + "profile/deleteaccount",
    UPDATE_PROFILE: BASE_URL + "profile/updateprofile",
    UPDATE_PROFILE_PICTURE: BASE_URL + "profile/updatedisplaypicture",
    GET_USER_ENROLLED_COURSES: BASE_URL + "profile/enrolledcourses",
}

export const courseEndPoints = {
    CREATE_COURSE: BASE_URL + "course/createcourse",
    UPDATE_COURSE: BASE_URL + "course/updatecourse",
    DELETE_COURSE: BASE_URL + "course/deletecourse",
    GET_MY_COURSES: BASE_URL + "course/getmycourses",
    SHOW_ALL_COURSES: BASE_URL + "course/showallcourses",
    GET_COURSE_DETAILS: BASE_URL +  "course/getcoursedetails",
    GET_TOP_RATED_COURSES: BASE_URL + "course/gettopratedcourses",

    CREATE_SECTION: BASE_URL + "course/createsection",
    UPDATE_SECTION: BASE_URL + "course/updatesection",
    DELETE_SECTION: BASE_URL + "course/deletesection",

    CREATE_SUB_SECTION: BASE_URL + "course/createsubsection",
    UPDATE_SUB_SECTION: BASE_URL + "course/updatesubsection",
    DELETE_SUB_SECTION: BASE_URL + "course/deletesubsection",

}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const paymentEndpoints = {
    VERIFY_PAYMENT_API: BASE_URL + "payment/verifypayment",
    CAPTURE_PAYMENT_API: BASE_URL + "payment/capturepayment"
}