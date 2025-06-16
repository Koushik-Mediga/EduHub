import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse, setEditLecture, setEditSections, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';

const PublishForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const publishCourseHandler  = async ()=>{
    dispatch(setStep(1));
    dispatch(setCourse(null));
    dispatch(setEditCourse(false));
    dispatch(setEditSections(false));
    dispatch(setEditLecture(false));
    toast.success("Course Published, you can see it in My Courses");
    navigate('/dashboard/my-courses');
  }

  return (
    <div>
      <button onClick={publishCourseHandler} className='bg-yellow-50 text-black'>Publish this course</button>
    </div>
  )
}

export default PublishForm