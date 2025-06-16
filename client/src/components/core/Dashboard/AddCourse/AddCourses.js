import React from 'react'
import RenderCourseForms from './RenderCourseForms'
import { useSelector } from 'react-redux'

const AddCourses = () => {
  const editCourse = useSelector((state)=>state.course.editCourse);
  const editSections = useSelector((state)=>state.course.editSections);
  return (
    <div className='w-full h-full flex flex-col items-center text-richblack-5'>
        <div className='w-11/12 flex flex-col items-center'>
            <h1 className='text-5xl text-white m-6 '>
                {(editCourse && editSections)?'Edit Course':'Add Course'}
            </h1>
            <RenderCourseForms />
        </div>
    </div>
  )
}

export default AddCourses