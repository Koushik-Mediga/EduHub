import React, { useState } from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const handleSidebarClick = ()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }

  return (
    <div className='w-full flex flex-row gap-2'>
        {
            (isSidebarOpen)?<div className='bg-richblack-800 w-2/12 min-h-screen relative transition-all'><RiCloseCircleFill onClick={handleSidebarClick} className='text-white absolute right-0 m-2 hover:cursor-pointer hover:text-pink-500 transition-all'/><Sidebar/></div>:<IoMenu onClick={handleSidebarClick} className='text-white text-2xl m-2 hover:cursor-pointer'/>
        }
        <div className='w-full'>
            <Outlet/>
        </div>
    </div>
  ) 
}

export default Dashboard