import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setCourse, setEditCourse, setEditLecture, setEditSections, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { publishCourse, updateCourse } from '../../../../services/operations/courseApi';

const PublishForm = () => {
  const token = useSelector((state)=>state.auth.token);
  const course = useSelector((state)=>state.course.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const publishCourseHandler  = async ()=>{
    await publishCourse({courseId:course._id, token, dispatch});
    dispatch(setStep(1));
    dispatch(setCourse(null));
    dispatch(setEditCourse(false));
    dispatch(setEditSections(false));
    dispatch(setEditLecture(false));
    navigate('/dashboard/my-courses');
  }

  return (
    <div>
      <button onClick={publishCourseHandler} className='bg-yellow-50 text-black p-3'>Publish this course</button>
    </div>
  )
}

export default PublishForm