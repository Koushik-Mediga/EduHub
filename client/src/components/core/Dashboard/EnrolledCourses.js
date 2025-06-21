import React, { useEffect, useState } from 'react';
import { getUserEnrolledCourses } from '../../../services/operations/profileApi';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const getEnrolledCoursesData = async () => {
    setLoading(true);
    const response = await getUserEnrolledCourses(token, dispatch);
    console.log("Courses: " , response.data.courses);
    setEnrolledCourses(response.data.courses || []);
    setLoading(false);
  };

  useEffect(() => {
    getEnrolledCoursesData();
    console.log(enrolledCourses);
  }, []);

  return (
    <div className="text-white p-10 flex flex-col itmes-center gap-10 w-full">
      <h1 className="text-3xl text-white">Enrolled Courses</h1>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[100px]">
          <ClipLoader color="#ffffff" size={30} />
        </div>
      ) : (
        <div>
          {(Array.isArray(enrolledCourses) && enrolledCourses.length>0) ? (
            <div className="p-3 flex flex-col w-10/12">
            <div className='flex flex-row bg-richblack-600 h-14 text-md items-center justify-center'>
              <p className='text-richblack-100 w-1/2'>Course Name</p>
              <p className='text-richblack-100 w-1/4'>Category</p>
              <p className='text-richblack-100 w-1/4'>Progress</p>
            </div>
            {
                enrolledCourses.map((item, index)=>{
                    return <div className='flex flex-row bg-richblack-700 h-14 text-md items-center justify-center'>
                        <div className='w-1/2 flex flex-row items-center'>
                            <img src={item.thumbnail} alt='Thumbnail' className='h-auto w-[30px]'></img>
                            <p>{item.courseName}</p>
                        </div>
                        <p className='w-1/4'>{item.category}</p>
                        <p className='w-1/4'>{item.courseProgress}</p>
                    </div>
                })
            }
            </div>
          ) : (
            <p className="text-richblack-50 text-lg">
              You are not enrolled in any courses
            </p>
          )}
          </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
