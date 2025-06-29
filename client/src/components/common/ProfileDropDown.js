import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { TbBooks, TbLogout } from "react-icons/tb";
import { IoCart, IoPerson } from "react-icons/io5";
import { IoMdAdd, IoMdSettings } from "react-icons/io";
import { BiBook } from 'react-icons/bi';
import { ImBooks } from 'react-icons/im';
import { MdMenuBook, MdMenuOpen } from 'react-icons/md';

const ProfileDropDown = () => {
    const user = useSelector((state)=>state.profile.user);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOpen = () => {
        setOpen(prev => !prev);
    };

    // Detect clicks outside the dropdown and profile image
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-fit h-full flex justify-center items-center' ref={dropdownRef}>
            <button onClick={toggleOpen}>
                <img src={user.image} className='rounded-full h-[30px] w-[30px] object-cover' alt='profile' />
            </button>

            <div className={`${open ? 'visible' : 'invisible'} absolute p-1 pt-1 rounded-md shadow-lg right-1 top-14 border bg-richblack-800 z-50 flex flex-col gap-2 justify-around`}>
                <Link to={'/dashboard/my-profile'} onClick={toggleOpen} className='w-[180px] pb-1 flex flex-row text-richblack-25 border-b border-richblack-300 items-center gap-3 hover:text-white'><IoPerson /><p>Profile</p></Link>
                {
                    user.accountType === 'Student' ?
                    <Link to={'/dashboard/enrolled-courses'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 border-b border-richblack-300 flex flex-row items-center gap-3 hover:text-white'><BiBook /><p>Enrolled Courses</p></Link> :
                    <Link to={'/dashboard/my-courses'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 border-b border-richblack-300 flex flex-row items-center gap-3 hover:text-white'><MdMenuBook /><p>My Courses</p></Link>
                }
                {
                    user.accountType === 'Student' ?
                    <Link to={'/dashboard/cart'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 border-b border-richblack-300 flex flex-row items-center gap-3 hover:text-white'><IoCart /><p>Cart</p></Link> :
                    <Link to={'/dashboard/add-course'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 border-b border-richblack-300 flex flex-row items-center gap-3 hover:text-white'><IoMdAdd /><p>Add Course</p></Link>
                }
                <Link to={'/dashboard/settings'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 border-b border-richblack-300 flex flex-row items-center gap-3 hover:text-white'><IoMdSettings /><p>Settings</p></Link>
                <Link to={'/dashboard/logout'} onClick={toggleOpen} className='w-[180px] pb-1 text-richblack-25 flex flex-row items-center gap-3 hover:text-white'><TbLogout /><p>Logout</p></Link>
            </div>
        </div>
    );
};

export default ProfileDropDown;
