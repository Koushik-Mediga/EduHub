import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light (2).png'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropDown from './ProfileDropDown';
import Button from '../core/HomePage/Button';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis';
import { IoIosArrowDown } from "react-icons/io";


const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const totalItems = useSelector((state) => state.cart.totalItems);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async ()=>{
            try{
                const result = await apiConnector("GET", categories.CATEGORIES_API);
                console.log(user);
                console.log(result);
                setSubLinks(result.data.categories);
            }catch(e){
                console.log(e)
            }
        }

    useEffect(()=>{
        fetchSubLinks();
    }, [])

  return (
    <div className=' flex h-16 w-full items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className=' flex w-10/12 max-w-maxContent items-center justify-between'>
            <Link to='/'>
                <img src={logo} alt='Logo' className=' h-[59px] p-1'/>
            </Link>

            <nav>
                <ul className='flex gap-x-4 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index)=>{
                            return <li key={index}>
                                {(link.title==='Catalog')?(
                                    <div className=' flex gap-1 items-center group hover:cursor-pointer overflow-hidden'>
                                        <p>{link.title} </p> 
                                        <IoIosArrowDown className='text-richblack-25 text-center mt-1 hover:cursor-pointer transition-all group-hover:rotate-180' />
                                        <div className='invisible z-50 absolute top-[7%]  flex flex-col rounded-md bg-richblack-700 p-4 text-richblack-800 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-90 lg:w-[300px]'>
                                            <Link to={"/course/python"} className='hover:text-blue-50 hover:underline text-white'><p>python</p></Link>
                                            <Link to={"/course/webDev"}><p className='hover:text-blue-50 hover:underline text-white'>Web Development</p></Link>
                                        </div>
                                    </div>
                                )
                                :
                                (<Link to={link?.path}>
                                            <p className={(location.pathname===link.path)?('text-yellow-25'):('text-richblack-25')}>
                                                {link.title} 
                                            </p>
                                        </Link>)}
                            </li>
                        })
                    }
                </ul>
            </nav>

            <div className='flex gap-6 flex-row justify-center items-center h-[100%]'>
                {
                    user && user?.accountType !=="Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <FaShoppingCart className='text-richblack-25 hover:text-white h-10'/>
                            {
                                totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to={"/login"}>
                            <button className=' bg-richblack-800 text-richblack-100  py-2 px-4 rounded-md'>Login</button>
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to={"/signup"}>
                            <button className=' bg-richblack-800 text-richblack-100 py-2 px-4 rounded-md'>Signup</button>
                        </Link>                    )
                }
                {
                    token!==null && <ProfileDropDown/>
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar