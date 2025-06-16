import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import toast from 'react-hot-toast'
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

export const sendOtp = async ({email, password, confirmPassword, accountType, firstName, lastName, contactNumber}, navigate)=>{
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", authEndpoints.SENDOTP_API, {email});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        navigate('/verifyotp', {
            state:{
                email,
                password,
                confirmPassword,
                accountType,
                firstName,
                lastName,
                contactNumber,
            }
        });
        toast.success("otp sent successfully", {
            id:toastId
        })
    }
    catch(e){
        console.log(e.message);
        if(e.status==409){
            toast.error("Account already exists with the given email id, please login", {id: toastId});
            return ;
        }
        else if(e.status===400){
            toast.error(e.response.message, {id: toastId});
            return;
        }
        else if(e.status===404){
            toast.error(e.response.message, {id: toastId});
            return;
        }
        else {
            toast.dismiss(toastId)
            navigate("/error", {
                state:{
                    errorMessage:e.message || "An unknown error occured",
                    errorStatus:e.status || 500,
                }
            })
        }
    }
}

export const signup = async ({email, password, confirmPassword, accountType, firstName, lastName, contactNumber}, otp, dispatch, navigate)=>{
    const toastId = toast.loading("Loading.....");
    try{
        
        const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {email, password, confirmPassword, accountType, firstName, lastName, contactNumber, otp});
        console.log(email, password, confirmPassword, firstName, lastName, otp, contactNumber);
        dispatch(setUser(response.data.user));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/login");
        toast.success("Sign up successful", {id: toastId})
    }
    catch(e){
        console.log(e);
            if(e.status==409){
                toast.error("Account already exists with the given email id, please login", {id: toastId});
                return ;
            }
            else if(e.status===400){
                toast.error("Incorrect OTP", {id: toastId});
                return;
            }
            else if(e.status===404){
                toast.error("OTP expired, signup again", {id: toastId});
                return;
            }
            else {
                toast.dismiss(toastId)
                navigate("/error", {
                    state:{
                        errorMessage:e.message || "An unknown error occured",
                        errorStatus:e.status || 500,
                    }
                })
            }
    }
}

export const login = async (dispatch, {email, password, accountType}, navigate)=>{
    const toastId = toast.loading("Loading...");
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
        toast.success('Login successful', {id: toastId, style: {overflow: 'visible', maxHeight: 'none', padding: '8px 12px'},});
        navigate('/dashboard/my-profile');
    }
    catch(e){
        const status = e?.response?.status;
        const message = e?.response?.data.message;
        
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

export const logout = (navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.setItem("token", null);
    localStorage.setItem("user", null);
    navigate("/")
    toast.dismiss(toastId);
}

export const changePassword = async (navigate, {email, password, newPassword, token}) =>{
    try{
        const response = await apiConnector("POST", authEndpoints.CHANGEPASSWORD_API, { email, password, newPassword}, {Authorization: `Bearer ${token}`,})
        toast.success("Password Changed Successfully");
        navigate("/");
    } catch(e){
        const status = e?.response?.status;
        const message = e?.response?.data.message;

        if(status===400 || status===401){
            toast.error(message);
            return;
        }

        if(status===404){
            toast.error("User not found");
            return;
        }

        navigate("/error", {
            state:{
                errorMessage:e.message || "An unknown error occured",
                errorStatus:e.status || 500,
            }
        })
    }
}

export const resetPasswordToken  = async ({email})=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", authEndpoints.RESET_PASSWORD_TOKEN, {email}, null, null );
        toast.success("Password Reset link is sent to your registered email, please check.", {id:toastId});
    } catch (error) {
        console.log(error.response);
        toast.error(error.response.message, {id:toastId});
    }
}

export const resetPassword = async({token, password, confirmPassword})=>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", authEndpoints.RESET_PASSWORD, {token, password, confirmPassword}, null, null );
        toast.success("Password Reset Successfully", {id:toastId});
    } catch (error) {
        console.log(error.response);
        toast.error(error.response.message, {id:toastId});
    }
}