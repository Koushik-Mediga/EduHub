import React, { useState, useEffect } from 'react';
import { getTopRatedCourses } from '../../../services/operations/courseApi';
import CourseCard from '../CatalogPage/CourseCard'; // Adjust path if needed

const TopCoursesSection = () => {
  const [topRatedCourses, setTopRatedCourses] = useState([]);

  useEffect(() => {
    const fetchTopRatedCourses = async () => {
      await getTopRatedCourses({ setTopRatedCourses });
    };
    fetchTopRatedCourses();
  }, []);

  return (
    <div className="flex flex-col items-center w-full justify-center mt-20 pb-14">
      <p className="text-4xl text-richblack-500 font-bold text-center w-10/12 mb-5">
        Some Of The{" "}
        <span className="text-blue-100 font-bold">Top Rated Courses</span>
      </p>

      <div className="w-full flex flex-wrap gap-6 justify-center">
        {topRatedCourses.length > 0 ? (
          topRatedCourses.map((course) => (
            <div key={course._id} className="w-[400px]">
              <CourseCard course={course} />
            </div>
          ))
        ) : (
          <p className="text-richblack-400 text-center">No top rated courses found.</p>
        )}
      </div>
    </div>
  );
};

export default TopCoursesSection;
