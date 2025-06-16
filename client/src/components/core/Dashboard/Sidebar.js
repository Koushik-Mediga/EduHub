import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { IoMdPerson } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { MdMenuBook } from "react-icons/md";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { ImBooks } from "react-icons/im";




const Sidebar = () => {
    const user = useSelector((state)=>state.profile.user);
    const location = useLocation();
  return (
    <div className='flex flex-col gap-5 pl-2 pr-2 text-richblack-25 mt-3'>
        
        {
            (user.accountType==='Student')?(
                <div className='py-2 flex flex-col gap-2 border-b-2 pb-2'>
                    <Link to={'/dashboard/my-profile'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/my-profile')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <IoMdPerson />
                        <p>My Profile</p>
                    </Link>
                    <Link to='/dashboard/enrolled-courses' className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/my-courses')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <MdMenuBook />
                        <p>Enrolled Courses</p>
                    </Link>
                    <Link to={'/cart'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/add-course')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <CiShoppingCart />
                        <p>Cart</p>
                    </Link>
                </div>
            ):(
                <div className='py-2 flex flex-col gap-2 border-b-2 pb-2'>
                    <Link to={'/dashboard/my-profile'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/my-profile')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <IoMdPerson />
                        <p>My Profile</p>
                    </Link>
                    <Link to={'/dashboard/my-courses'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/my-courses')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <ImBooks />
                        <p>My Courses</p>
                    </Link>
                    <Link to={'/dashboard/add-course'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/add-course')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                        <IoMdAdd />
                        <p>Add Course</p>
                    </Link>
                </div>
            )
        }

        <div className='py-2 flex flex-col gap-2 '>
            <Link to={'/dashboard/settings'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/settings')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                <IoSettingsOutline />
                <p>Settings</p>
            </Link>
            <Link to={'/dashboard/logout'} className={`pl-2 flex flex-row gap-1 items-center hover:text-white transition-all ${(location.pathname==='/dashboard/logout')?('border-l-2 text-yellow-50 border-l-yellow-50'):('text-richblack-25')}`}>
                <TbLogout />
                <p>Logout</p>
            </Link>
        </div>
        
    </div>
  )
}

export default Sidebar