import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TbLogout } from "react-icons/tb";
import { IoPerson } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";


const ProfileDropDown = () => {
    const user = useSelector((state)=>state.profile.user);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleOpen = ()=>{
        setOpen(!open);
    }

  return (
    <div className='w-fit h-full flex justify-center items-center'>
        <button onClick={toggleOpen}><img src={user.image} className='rounded-full h-[30px] w-[30px] object-cover' alt='image'  /></button>
        <div className={`${(open)? 'visible': 'invisible'} p-4 absolute right-16 top-14 border border-yellow-50 bg-richblack-700 z-50 flex flex-col gap-2 justify-around`}>
            <Link to={'/dashboard/my-profile'} onClick={toggleOpen} className='  flex flex-row text-richblack-25 items-center gap-1 hover:text-white'><IoPerson /><p>Profile</p></Link>
            <Link to={'/dashboard/settings'} onClick={toggleOpen} className=' text-richblack-25 flex flex-row items-center gap-1 hover:text-white'><IoMdSettings /><p>Settings</p></Link>
            <Link to={'/dashboard/logout'} onClick={toggleOpen} className=' text-richblack-25 flex flex-row items-center gap-1 hover:text-white' ><TbLogout /><p>Logout</p></Link>
        </div>
    </div>
  )
}

export default ProfileDropDown