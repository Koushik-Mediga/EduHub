import { profileEndPoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";

export const getUserDetails = async (token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        console.log(token);
        const response = await apiConnector("GET", profileEndPoints.GETUSERDETAILS, null, {Authorization: `Bearer ${token}`}, null);
        dispatch(setUser(response.data.user));
        toast.dismiss(toastId);
    } catch (e) {
        const status = e?.response?.status;
        const message = e?.response?.data.message;
        console.log(e.response)
        if(status===400 || status===401){
            toast.error(message, {id: toastId});
            return;
        }

        if(status===404){
            toast.error("User not found", {id: toastId});
            return;
        }

        toast.dismiss(toastId);

        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}

export const deleteAccount = async (token, dispatch, navigate)=>{
    const toastId = toast.loading('Loading...');
    try{
        const response = await apiConnector("DELETE", profileEndPoints.DELETE_ACCOUNT, null, {Authorization: `Bearer ${token}`}, null)
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.setItem("token", null);
        localStorage.setItem("user", null);
        navigate("/");
        toast.dismiss(toastId);
    }catch(e){
        const status = e?.response?.status;
        const message = e?.response?.data.message;
        console.log(e.response)
        if(status===400 || status===401){
            toast.error(message, {id: toastId});
            return;
        }

        if(status===404){
            toast.error("User not found", {id: toastId});
            return;
        }

        toast.dismiss(toastId);

        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}

export const updateProfile = async ({gender, dateOfBirth, about, contactNumber}, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading....");
    try{
        const response = await apiConnector("PUT", profileEndPoints.UPDATE_PROFILE, {gender, dateOfBirth, about, contactNumber}, {Authorization: `Bearer ${token}`}, null)
        getUserDetails(token, dispatch, navigate);
        toast.success("Profile Details Updated successfully", {id:toastId});
    }catch(e){
        const status = e?.response?.status;
        const message = e?.response?.data.message;
        console.log(e.response)
        if(status===400 || status===401){
            toast.error(message, {id: toastId});
            return;
        }

        if(status===404){
            toast.error("User not found", {id: toastId});
            return;
        }

        toast.dismiss(toastId);

        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}

export const updateProfilePicture = async (profilePicture, token, dispatch, navigate)=>{
    const toastId = toast.loading("Loading...");
    try {
        const file = profilePicture;
        const formData = new FormData();
        formData.append("file", file);
        const response = await apiConnector("PUT", profileEndPoints.UPDATE_PROFILE_PICTURE, formData, {Authorization: `Bearer ${token}`}, null);
        getUserDetails(token, dispatch, navigate);
        toast.success("Profile Picture Updated successfully", {id:toastId});
        navigate('/dashboard/settings');
    } catch (e) {
        const status = e?.response?.status;
        const message = e?.response?.data.message;
        console.log(e.response)
        if(status===400 || status===401){
            toast.error(message, {id: toastId});
            return;
        }
        if(status===404){
            toast.error("User not found", {id: toastId});
            return;
        }

        toast.dismiss(toastId);

        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}