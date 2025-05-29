import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TbLogout } from "react-icons/tb";
import { RiProfileLine } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import LogoutBox from './LogoutBox';



const ProfileDropDown = () => {
    const user = useSelector((state)=>state.profile.user);
    const [open, setOpen] = useState(false);
    const [isLogoutBoxOpen, setIsLogoutBoxOpen] = useState(false);

    const toggleLogoutBox = ()=>{
        setIsLogoutBoxOpen(!isLogoutBoxOpen);
    }

    const toggleOpen = ()=>{
        setOpen(!open);
    }

  return (
    <div className='w-fit h-full flex justify-center items-center'>
        <button onClick={toggleOpen}><img src={user.image} className='rounded-full h-[30px]' alt='image'  /></button>
        <div className={`${(open)? 'visible': 'invisible'} rounded-lg p-4 absolute right-16 top-14 bg-richblack-700 z-50 flex flex-col gap-2 justify-around`}>
            <Link to={'/dashboard'} className='  flex flex-row text-richblack-25 items-center gap-1 hover:text-white'><MdDashboardCustomize /><p>Dashboard</p></Link>
            <Link to={'/profile'} className=' text-richblack-25 flex flex-row items-center gap-1 hover:text-white'><RiProfileLine /><p>Profile</p></Link>
            <Link onClick={toggleLogoutBox} className=' text-richblack-25 flex flex-row items-center gap-1 hover:text-white' ><TbLogout className='text-[#DC2626]'/><p>Logout</p></Link>
        </div>
        {
            (isLogoutBoxOpen)? <LogoutBox toggleLogoutBox={toggleLogoutBox}/> : <div></div>
        }
        
    </div>
  )
}

export default ProfileDropDown