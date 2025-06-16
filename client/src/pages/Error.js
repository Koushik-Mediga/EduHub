import React from 'react'
import { FaRegFrown } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const Error = (props) => {
  const location = useLocation();
  const errorStatus = location.state?.errorStatus ?? props.errorStatus;
  const errorMessage = location.state?.errorMessage ?? props.errorMessage;
  return (
    <div className='w-screen h-screen  flex flex-col justify-center items-center gap-5 text-white'>
        <FaRegFrown className=' text-[150px]'/>
        <h1 className='text-3xl font-bold'>{errorStatus}</h1>
        <p className='text-xl font-semibold'>{errorMessage}</p>
    </div>
  )
}

export default Error