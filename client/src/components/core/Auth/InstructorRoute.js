import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const InstructorRoute = ({children}) => {
  const user = useSelector((state)=>state.profile.user);
  if(user!==null && user.accountType==='Instructor'){
    return children;
  }
  else{
    toast.error("This route is for Instructor account only");
        return <Navigate to='/login' />
  }
}

export default InstructorRoute