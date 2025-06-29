import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FcEmptyTrash } from "react-icons/fc";
import Button from '../HomePage/Button';
import { BsCartX } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";
import StarRating from '../../common/StarRating';
import { removeFromCart, resetCart } from '../../../slices/cartSlice';
import TopCoursesSection from '../HomePage/TopCoursesSection';
import { useMemo } from 'react';
import { buyCourse } from '../../../services/operations/StudentFeaturesApi';
import { useEffect } from 'react';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state)=>state.cart.cart);
    const total = useSelector((state)=>state.cart.total);
    const totalItems = useSelector((state)=>state.cart.totalItems);
    const token = useSelector((state)=>state.auth.token);
    const user = useSelector((state)=>state.profile.user);

    const courses = useMemo(() => cart.map(course => course._id), [cart]);


    const removeItemHandler = (courseId)=>{
        dispatch(removeFromCart(courseId));
    }

    const clearCart = ()=>{
        dispatch(resetCart());
    }

    const checkoutHandler = ()=>{
        if(token){
            buyCourse(token, courses, user, navigate, dispatch);
        }
    }
  
  
    return (
    <div className='text-white p-10 flex flex-col gap-10 w-full justify-start'>
        <h1 className='text-5xl text-white'>Shopping Cart </h1>
        {
            (totalItems===0)?
            <div className='flex flex-col justify-center items-center w-full gap-10'>
                <BsCartX className='text-9xl text-richblack-200'/>
                <p className='text-richblack-300 text-md'>Your cart is empty</p>
                <Button link='/' active={true} text="Browse Course"/>
            </div>:
            <div className='flex flex-row gap-10 w-full'>
                <div className='flex flex-col gap-5 w-3/4'>
                    <p className='text-white w-full text-md border-b border-richblack-200 font-bold pb-2 flex flex-row justify-between items-center'>{totalItems} Courses in Cart <button className='bg-richblack-700 hover:bg-richblack-800 transition-all py-2 px-5 text-white' onClick={()=>{clearCart()}}>Clear Cart</button></p>
                    {
                        (cart).map((course)=>(
                            <div key={course._id} className='w-full flex flex-row gap-5 pb-5 border-b border-richblack-200'>
                                <Link className='w-1/4' to={`/course/${course._id}`}>
                                    <img src={course.thumbnail} className='w-full h-auto object-cover'/>
                                </Link>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <h3 className='text-lg text-white font-extrabold'>{course.courseName}</h3>
                                    <p className='text-sm text-richblack-5'>By {course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                                    <p className='flex flex-row gap-3 text-sm text-richblack-50'><StarRating rating={4.3} /> <p>({(course?.ratingAndReviews || []).length} ratings) {(course?.studentsEnrolled || []).length} students enrolled</p></p>
                                    <p className='flex flex-row items-center gap-3 text-sm text-richblack-100'>{(course?.courseContent || []).length} Sections <GoDotFill /> {(course?.courseContent || []).reduce((a, s) => a + (s.subSection?.length || 0), 0)} Lectures <GoDotFill/> All Levels</p>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <p className='text-xl font-bold text-white '>{'\u20B9'}{course?.price}/-</p>
                                    <button onClick={()=>{removeItemHandler(course._id)}} className='w-full bg-yellow-50 hover:bg-yellow-200 transition-all py-2 px-5 text-black'>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-5 w-1/4'>
                    <h2 className='text-lg text-richblack-100 font-semibold'>Total: </h2>
                    <p className='text-4xl text-white'>{'\u20B9'} {total} /-</p>
                    <button onClick={checkoutHandler} className='text-black text-lg font-bold bg-caribbeangreen-200 hover:bg-caribbeangreen-400 transition-all w-full py-3 px-6 flex flex-row gap-2 justify-center items-center'>Proceed to checkout <FaArrowRightLong /></button>
                </div>
            </div>
        }
        <TopCoursesSection />
    </div>
  )
}

export default Cart