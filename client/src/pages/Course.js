import React, { useEffect, useState } from 'react'
import { getCourseDetails } from '../services/operations/courseApi';
import { useNavigate, useParams } from 'react-router-dom';
import StarRating from '../components/common/StarRating';
import { MdLanguage } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import 'react-accessible-accordion/dist/fancy-example.css';
import { Link } from 'react-router-dom';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import Button from '../components/core/HomePage/Button';
import TopCoursesSection from '../components/core/HomePage/TopCoursesSection';
import Footer from '../components/common/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { buyCourse } from '../services/operations/StudentFeaturesApi';
import { useMemo } from 'react';

const Course = () => {
    const [courseDetails, setCourseDetails] = useState({});
    const user = useSelector((state)=>state.profile.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const token = useSelector((state)=>state.auth.token);

    const isBought = useMemo(() => {
        return user?.courses?.includes(courseDetails?._id);
        }, [user, courseDetails]);

    

    const handleBuyCourse = ()=>{
        if(token){
            buyCourse(token, [id], user, navigate, dispatch);
        }
    }

    useEffect(() => {
        const fetchCourseDetails = async () => {
            await getCourseDetails({ courseId: id, setCourseDetails });
        }
        fetchCourseDetails();
        console.log(user);
        console.log(isBought);
    }, [id]);

    const addToCartClickHandler = async (course)=>{
        dispatch(addToCart(course));
    }

    return (
        <div className='relative w-full bg-richblack-900 flex flex-col'>
            <div className=' pt-24 pb-24 pl-16 w-full bg-richblack-800 flex flex-col justify-center gap-5'>
                <p className='font-bold text-white text-4xl'>{courseDetails?.courseName}</p>
                <p className='text-md text-richblack-200 font-semibold'>{courseDetails?.category?.name}</p>
                <p className='text-richblack-50 text-sm flex flex-row items-center'>
                    <span><StarRating rating={4.3} /> ({(courseDetails?.ratingAndReviews || []).length} ratings) {(courseDetails?.studentsEnrolled || []).length} students enrolled</span>
                </p>
                <p className='text-md text-richblack-5'>
                    By {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}
                </p>
                <p className='flex flex-row items-center gap-2 text-richblack-5'>
                    <FaRegDotCircle /> Created at 16 Nov, 2025 | 
                    <span className='flex flex-row items-center gap-1'>
                        <MdLanguage /> <span>English</span>
                    </span>
                </p>
            </div>

            <div className='absolute right-16 top-28 w-3/12 bg-richblack-700 shadow-lg  px-5 py-10 flex flex-col gap-6'>
                <img src={courseDetails?.thumbnail} className='rounded-lg h-52' alt="course thumbnail" />
                <div className='flex flex-row justify-between items-center'>
                    <p className='text-2xl text-white font-bold'>Rs. {courseDetails?.price} /-</p>
                    <p className='text-sm text-richblack-50'>({courseDetails?.category?.name})</p>
                </div>
                {                
                    user?.accountType!=='Instructor' && !isBought && <button onClick={()=>{handleBuyCourse()}} className='rounded-md w-full p-2 flex justify-center items-center bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>Buy Now</button>
                }   
                {
                    user?.accountType==='Student' && isBought && <Link className='text-blue-50 hover:text-blue-200 transition-all hover:underline' to={`/view-course/${courseDetails._id}`} >View Enrolled Courses</Link>
                }
                {
                    user?.accountType!=='Instructor' && !isBought && <button onClick={()=>{addToCartClickHandler(courseDetails)}} className='rounded-md w-full p-2 flex justify-center items-center bg-richblack-800 text-richblack-50 hover:scale-95 transition-all duration-200'>Add to Cart</button>
                }     
                {
                    user?.accountType!=='Instructor' && <div className='flex flex-row-reverse w-full'><Link to="/dashboard/cart" className='text-blue-50 hover:text-blue-200 transition-all hover:underline'>Go to Cart</Link></div>
                }          
                <p className='text-sm text-center text-richblack-50'>30-day money-back guarantee</p>
            </div>

            <div className='w-7/12 pl-16 pt-10 flex flex-col justify-center gap-5'>
                <p className='text-3xl font-semibold text-richblack-25'>Description</p>
                <p className='text-md text-richblack-5'>{courseDetails?.courseDescription}</p>
            </div>

            <div className='w-7/12 pl-16 pt-10 flex flex-col justify-center gap-5'>
                <p className='text-3xl font-semibold text-richblack-25'>What You Will Learn</p>
                <p className='text-md text-richblack-5'>{courseDetails?.whatYouWillLearn}</p>
            </div>

            <div className='w-7/12 pl-16 pt-10 mb-14 flex flex-col justify-center gap-5'>
                <p className='text-3xl font-semibold text-richblack-25'>Course Content</p>
                <p className='text-sm text-richblack-5'>
                    ( Total Sections: {(courseDetails?.courseContent || []).length} and Total Lectures: {(courseDetails?.courseContent || []).reduce((a, s) => a + (s.subSection?.length || 0), 0)} )
                </p>

                {Array.isArray(courseDetails?.courseContent) && courseDetails.courseContent.length > 0 ? (
                    <Accordion allowZeroExpanded>
                        {courseDetails.courseContent.map((item) => (
                            <AccordionItem key={item._id}>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {item?.sectionName}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    {item?.subSection?.length > 0 ? (
                                        <div className='flex flex-col justify-center w-full'>
                                            {item.subSection.map((lecture) => (
                                                <div
                                                    key={lecture._id}
                                                    className='w-full text-richblack-5 flex justify-center items-center py-2 border-b border-richblack-700'
                                                >
                                                    {lecture.title}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-richblack-300">No Lectures available</div>
                                    )}
                                </AccordionItemPanel>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className='text-richblack-300'>No course content available.</p>
                )}
            </div>

            <div  className='w-full pl-16 pt-10 mb-14 flex flex-row items-center gap-5'>
                <div className='w-1/3 flex flex-col gap-5'>
                    <p className='text-3xl font-semibold text-richblack-25'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                    <p className='text-md text-richblack-5'>{courseDetails?.instructor?.additionalDetails?.about}</p>
                </div>
                <img className='w-[150px] h-[150px] rounded-full' src={courseDetails?.instructor?.image} />
            </div>

            <TopCoursesSection />

            <Footer />
        </div>
    )
}

export default Course;
