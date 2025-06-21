import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMyCourses } from '../../../services/operations/courseApi'
import StarRatings from 'react-star-ratings';
import { MdDelete, MdEdit } from "react-icons/md";
import { setCourse, setEditCourse, setEditLecture, setEditSections, setStep } from '../../../slices/courseSlice'
import { BsBookFill } from "react-icons/bs";
import Button from '../HomePage/Button'



const Mycourses = () => {
    const dispatch = useDispatch();
    const myCourses = useSelector((state)=>state.myCourses.courses);

    const navigate = useNavigate();
    
  useEffect(() => {
    const fetchCourses = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      await getMyCourses(token, dispatch, navigate);
    };
    fetchCourses();
  }, [dispatch, navigate]);

  
    const editCourseHandler = (course)=>{
        dispatch(setStep(1));
        dispatch(setCourse(course));
        dispatch(setEditCourse(true));
        dispatch(setEditSections(false));
        dispatch(setEditLecture(false));
        navigate('/dashboard/add-course');
    }


    return (
    <div className='text-white flex flex-col justify-center gap-4 '>
        <h1 className='text-5xl text-left pl-5 pt-5'>My Courses</h1>
        {
            (Array.isArray(myCourses) && myCourses.length===0)?(
                <div className='flex flex-col items-center justify-center gap-10'>
                    <BsBookFill className='text-9xl text-richblack-50'/>
                    <p className='text-richblack-300 text-md'>You have no courses.</p>
                    <Button link='/dashboard/add-course' active={true} text='Create a Course'></Button>
                </div>
            ):
            (
                <div className='w-11/12 h-full flex flex-col gap-2'>
            {
                myCourses.map((course, index)=>{
                    return (
                        <div key={index} className='w-full flex flex-row h-60 m-6'>
                            <img src={course.thumbnail} alt='Thumbnail Image' className='w-[40%] object-cover mr-5 rounded-xl' />
                            <div className='w-[70%] flex flex-col gap-4'>
                                <h2 className='text-xl flex flex-row justify-between items-center'>{course.courseName} <div className='flex flex-row justify-center items-center gap-2'><MdEdit onClick={()=>editCourseHandler(course)} className='text-richblack-400 hover:cursor-pointer transition-all hover:text-richblack-50' /><MdDelete onClick={()=>{navigate(`/dashboard/deletecourse?courseId=${course._id}`)}} className='text-richblack-400 hover:cursor-pointer transition-all hover:text-pink-400' /></div></h2>
                                <p className='text-sm text-richblack-200'>{course.publishStatus}</p>
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
            )
        }
    </div>
  )
}

export default Mycourses