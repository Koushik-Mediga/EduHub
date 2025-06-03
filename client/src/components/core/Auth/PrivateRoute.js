import React, { Children } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=>{
    const token = useSelector((state)=>state.auth.token);

    if(token !== null){
        return children;
    }
    else{
        toast.error("Please Login first");
        return <Navigate to='/login' />
    }
}

export default PrivateRoute