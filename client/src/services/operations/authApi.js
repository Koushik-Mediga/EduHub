import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import toast from 'react-hot-toast'
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";



export const login = async (dispatch, {email, password, accountType}, navigate)=>{
    try{
        const response = await apiConnector("POST", authEndpoints.LOGIN_API, {email, password});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        console.log(response);
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success('Login successful', {
            style: {
                padding: '8px 12px'
            },
        });
        navigate('/dashboard/my_profile');
    }
    catch(e){
        console.log(e.message);
        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}

export const logout = (navigate, dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    navigate("/")
}