import React from 'react'
import { Link } from 'react-router-dom'
const Button = ({text, link, active}) => {
  return (
    <Link to={link}>
    <div className={`rounded-md w-fit h-fit flex justify-center items-center ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800 text-richblack-25'} hover:scale-95 transition-all duration-200`}>
    <p className='text-md my-3 mx-5'>{text}
    </p>
    </div>
    </Link>
  )
}

export default Button