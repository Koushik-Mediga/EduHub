import { apiConnector } from "../apiconnector";
import { paymentEndpoints, profileEndPoints } from "../apis";
import toast from "react-hot-toast";
import FullLogo from '../../../src/assets/Logo/Logo-Full-Dark (2).png'
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";
import { setUser } from "../../slices/profileSlice";

const {CAPTURE_PAYMENT_API, VERIFY_PAYMENT_API} = paymentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("RazorPay SDK failed to load", {id:toastId});
            return ;
        }

        const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT_API, {courses},  {Authorization: `Bearer ${token}`}, null);
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "EduHub",
            description: "Thank You for Purchasing the course",
            image: FullLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function(response) {
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("OOPS.., payment failed");
            console.log(response.error);
        })
    
    } catch (error) {
        console.log("PAYMENT API ERROR....", error);
        console.log(error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying payment....");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData,  {Authorization: `Bearer ${token}`}, null);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, You are added to the course");
        try {
            const userDetailsAfterPayment = await apiConnector("GET", profileEndPoints.GETUSERDETAILS, null, {Authorization: `Bearer ${token}`}, null);
            dispatch(setUser(userDetailsAfterPayment.data.user));
            localStorage.setItem("user", JSON.stringify(userDetailsAfterPayment.data.user));
        } catch (error) {
            console.log(error.response);
            toast.error("Cannot set user details");
        }
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error", error);
        toast.error("could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}