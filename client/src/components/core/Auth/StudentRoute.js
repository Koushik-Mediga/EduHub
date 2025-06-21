import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const StudentRoute = ({children}) => {
  const token = useSelector((state)=>state.auth.token);
    const user = useSelector((state)=>state.profile.user);
    if(user !== null && user.accountType==='Student'){
        return children;
    }
    else{
        toast.error("This route is for Student account only");
        return <Navigate to='/login' />
    }
}

export default StudentRoute