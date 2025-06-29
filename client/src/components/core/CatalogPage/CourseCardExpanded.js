import React from 'react'
import StarRating from '../../common/StarRating'
import { useNavigate } from 'react-router-dom'

const CourseCardExpanded = ({course}) => {

    const navigate = useNavigate();

    function cardClickHandler(id){
        navigate(`/course/${id}`);
    }

  return (
    <div onClick={()=>{cardClickHandler(course._id)}} className=" bg-richblack-800 hover:cursor-pointer rounded-lg w-full shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Thumbnail */}
      <img
        src={course?.thumbnail}
        alt={course?.courseName}
        className="w-full h-48 object-cover"
      />

      {/* Course Info */}
      <div className="p-4 text-richblack-5">
        {/* Course Name */}
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {course?.courseName}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2 space-x-1 text-yellow-400">
          <StarRating rating={course?.rating || 4.3} />
          <span className="text-sm text-richblack-300 ml-1">
            {course?.rating || 4.3}
          </span>
        </div>

        {/* Instructor */}
        <p className="text-sm text-richblack-300">
          By{" "}
          <span className="font-medium text-richblack-200">
            {course?.instructor?.firstName || "Unknown"}{" "}
            {course?.instructor?.lastName || ""}
          </span>
        </p>
      </div>
    </div>
  )
}

export default CourseCardExpanded