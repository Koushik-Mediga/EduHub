import React from 'react'
import { resetPassword } from '../services/operations/authApi';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formDetails, setFormDetails] = useState({ password:"", newPassword:""});
    const navigate = useNavigate();

    const params = useParams();

    const changeHandler = (event)=>{
        setFormDetails((prev)=>{
            return {...prev, [event.target.name]:event.target.value};
        })
    }

    const submitHandler = async ()=>{
        console.log(formDetails);
        const { password, newPassword } = formDetails;
        await resetPassword({ password, confirmPassword:newPassword, token: params.id });
        navigate('/login');
    }

 return (
    <div className='flex flex-col gap-5 justify-center items-center mt-28'>
      <h1 className='text-3xl text-white'>Reset Password</h1>
      
      <div className='flex flex-col justify-start items-center gap-2 relative w-2/12'>
        <label className='text-md text-richblack-100'>Enter the New password </label>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          placeholder='password'
          name='password'
          id='password'
          value={formDetails.password}
          onChange={changeHandler}
          className='my-1 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
        />
        {showPassword ? (
          <FaRegEyeSlash
            onClick={() => setShowPassword(!showPassword)}
            className='text-richblack-400 absolute right-3 top-12 hover:cursor-pointer transition-all hover:text-richblack-25'
          />
        ) : (
          <FaRegEye
            onClick={() => setShowPassword(!showPassword)}
            className='text-richblack-400 absolute right-3 top-12 hover:cursor-pointer transition-all hover:text-richblack-25'
          />
        )}
      </div>

      <div className='flex flex-col justify-start items-center gap-2 relative w-2/12'>
        <label className='text-md text-richblack-100'>Confirm Password </label>
        <input
          type={showNewPassword ? 'text' : 'password'}
          required
          placeholder='Confirm Password'
          name='newPassword'
          id='newPassword'
          value={formDetails.newPassword}
          onChange={changeHandler}
          className='my-1 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
        />
        {showNewPassword ? (
          <FaRegEyeSlash
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='text-richblack-400 absolute right-3 top-12 hover:cursor-pointer transition-all hover:text-richblack-25'
          />
        ) : (
          <FaRegEye
            onClick={() => setShowNewPassword(!showNewPassword)}
            className='text-richblack-400 absolute right-3 top-12 hover:cursor-pointer transition-all hover:text-richblack-25'
          />
        )}
      </div>

      <button onClick={submitHandler}>
        <div className='rounded-md p-4 flex justify-center items-center bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
          <p className='text-md font-bold'>Reset Password</p>
        </div>
      </button>
    </div>
  )

}

export default ResetPassword