import React from 'react'
import { TbCircleNumber1 } from "react-icons/tb";
import { TbCircleNumber2 } from "react-icons/tb";
import { TbCircleNumber3 } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux'
import CourseInfoForm from './CourseInfoForm';
import CourseBuilderForm from './CourseBuilderForm';
import PublishForm from './PublishForm';

const RenderCourseForms = () => {

    const step = useSelector((state)=>state.course.step);
    const editCourse = useSelector((state)=>state.course.editCourse);
    const editSections = useSelector((state)=>state.course.editSections);

  return (
    <div className='text-white flex flex-col gap-10 w-full items-center'>
        <div className='relative w-10/12 h-16 flex flex-row justify-between items-center'>
          <div className='z-0 top-[30%] absolute w-full border border-dashed border-richblack-50 '></div>
          <div className='flex flex-col  justify-center'>
            {(step>1)?<FaCheckCircle className='z-50 text-3xl bg-richblack-900 text-yellow-50'/>:<TbCircleNumber1 className={`z-50 text-3xl bg-richblack-900 ${(step==1)?'text-yellow-50 text-4xl':'text-white'}`} />}
            <p>Course Information</p>
          </div>
          <div className='flex flex-col z-50 items-center justify-center'>
            {(step>2)?<FaCheckCircle className='z-50 text-3xl bg-richblack-900 text-yellow-50'/>:<TbCircleNumber2 className={`z-50 text-3xl bg-richblack-900 ${(step==2)?'text-yellow-50 text-4xl':'text-white'}`} />}
            <p>Course Builder</p>
          </div>
          <div className='flex flex-col items-end justify-center'>
            {(step>3)?<FaCheckCircle className='z-50 text-3xl bg-richblack-900 text-yellow-50'/>:<TbCircleNumber3 className={`z-50 text-3xl bg-richblack-900 ${(step==3)?'text-yellow-50 text-4xl':'text-white'}`} />}
            <p>Publish</p>
          </div>
        </div>

        <div className='w-full flex justify-center items-center'>
          {
            (step==1) && <CourseInfoForm />
          }
          {
            step==2 && <CourseBuilderForm/>
          }
          {
            step==3 && <PublishForm/>
          }
        </div>
    </div>
  )
}



export default RenderCourseForms