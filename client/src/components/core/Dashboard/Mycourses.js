import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMyCourses } from '../../../services/operations/courseApi'
import StarRatings from 'react-star-ratings';


const Mycourses = () => {
    const dispatch = useDispatch();
    const myCourses = useSelector((state)=>state.myCourses.courses);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"));
        getMyCourses(token, dispatch, navigate);
        console.log(myCourses);
    }, [])
  
    return (
    <div className='text-white flex flex-col items-center gap-4 p-4'>
        {/* <h1 className='text-5xl text-left'>My Courses</h1> */}
        <div className='w-11/12 h-full flex flex-col gap-2'>
            {
                myCourses.map((course, index)=>{
                    return (
                        <div key={index} className='w-full flex flex-row h-60 m-6'>
                            <img src={course.thumbnail} alt='Thumbnail Image' className='w-[40%] object-cover mr-5 rounded-xl' />
                            <div className='w-[70%] flex flex-col gap-4'>
                                <h2 className='text-xl'>{course.courseName}</h2>
                                <p className='text-sm text-richblack-200'>{course.courseDescription}</p>
                                <div className='flex flex-row justify-between items-center'>
                                    <p className=' text-caribbeangreen-400 text-lg'>Rs. {course.price}/-</p>
                                    <StarRatings
                                        rating={2.403}
                                        starDimension="20px"
                                        starSpacing="1px"
                                        starRatedColor="#FFD60A"
                                        starEmptyColor='#2C333F'
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Mycourses