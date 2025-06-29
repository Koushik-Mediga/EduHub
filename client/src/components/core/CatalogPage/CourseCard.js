import React from 'react';
import StarRating from '../../common/StarRating';
import Footer from '../../common/Footer';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  
      const navigate = useNavigate();
  
      function cardClickHandler(id){
          navigate(`/course/${id}`);
      }
  
  return (
    <div
      onClick={()=>{cardClickHandler(course._id)}} 
      className="relative hover:cursor-pointer rounded-lg h-[250px] overflow-hidden group transition-all duration-300 shadow-md"
    >
      {/* Background Image */}
      <img
        src={course?.thumbnail}
        alt={course?.courseName}
        className="h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-70 transition-all duration-300" />

      {/* Static text at bottom before hover */}
      <div className="absolute bg-yellow-300 p-2 w-fit rounded-lg bottom-2 left-2 right-2 z-10 font-bold text-sm text-richblack-800 group-hover:opacity-0 transition-all duration-300">
        {course?.courseName || 'Untitled Course'}
      </div>

      {/* Hovered Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-end group-hover:justify-center px-4 py-6 text-white transition-all duration-300 transform group-hover:scale-110 group-hover:translate-y-0 translate-y-[40%] opacity-0 group-hover:opacity-100">
        <h2 className="text-2xl font-semibold text-center group-hover:text-yellow-300 transition-all duration-300">
          {course?.courseName || 'Untitled Course'}
        </h2>

        <div className="flex flex-col justify-center items-center gap-6 mt-3 text-sm text-richblack-5">
          <div className="flex items-center gap-2">
            <img
              src={course?.instructor?.image}
              alt="instructor"
              className="h-6 w-6 rounded-full object-cover"
            />
            <p>
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          </div>
          <div className="flex flex-row w-full justify-around items-center gap-5">
            <p>₹{course?.price}</p>
            <StarRating rating={4.3} />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CourseCard;
